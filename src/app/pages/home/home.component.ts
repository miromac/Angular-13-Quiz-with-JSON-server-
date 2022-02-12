import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.getHighScores().then((res)=>{
      console.log(res);
      this.scores = res;
      this.scores.sort((a,b)=>{
        return b.score - a.score;
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  scores:Array<any> = [];

}
