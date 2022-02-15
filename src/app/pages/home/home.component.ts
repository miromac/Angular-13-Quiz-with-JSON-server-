import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public quizService:QuizService, private router:Router) { }

  ngOnInit(): void {
    
    this.quizService.getHighScores().then((res)=>{
      //console.log(res);
      this.scores = res;
      this.scores.sort((a,b)=>{
        return b.score - a.score;
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  onStart() {
    
    if (this.quizService.userName == '') 
      alert("User's name field is empty, please provide any correct name! ")
    else if (this.quizService.userName.length < 3) 
      alert("User's name must contain atleast 3 characters! ")
    else {
      //routerLink="/quiz"
      //alert(this.quizService.userName)
      this.router.navigate(['/quiz']);
    }
  }

  scores:Array<any> = [];

}
