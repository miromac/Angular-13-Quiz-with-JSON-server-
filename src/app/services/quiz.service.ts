import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  questionsData:Array<any> = [];

  // public getQuestions(): Quiz[] {
  //   return QuizList;
  // }

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

}
