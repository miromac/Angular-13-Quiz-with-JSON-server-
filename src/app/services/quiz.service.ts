import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public questionsData:Array<any> = [];
  public userName = "";

  public getQuestions(){
    return new Promise<any>((resolve, reject)=>{
      this.http.get('https://opentdb.com/api.php?amount=20&difficulty=hard&type=multiple').subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    })
  }

  public updateScore(score:any){
    this.http.get("http://localhost:3000/leaderboard?username=" + this.userName).subscribe(
      (res:any)=>{
        if(res.length == 0){
          this.http.post('http://localhost:3000/leaderboard', {username: this.userName, score: score}).subscribe(
            (resp)=>{
              console.log('post');
              console.log(resp);
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        else{
          console.log(res);
          if(res[0].score < score){
            res[0].score = score;
            this.http.put('http://localhost:3000/leaderboard/' + res[0].id, res[0]).subscribe(
              (uRes)=>{
                console.log(uRes);
              },
              (uErr)=>{
                console.log(uErr);
              }
              );
          }
        }
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  public getHighScores(){
    return new Promise<any>((resolve, reject)=>{
      this.http.get('http://localhost:3000/leaderboard').subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

}
