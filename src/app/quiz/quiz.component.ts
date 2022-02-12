import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(public quizService:QuizService) { }

  ngOnInit(): void {

    this.quizService.getQuestions().then((res)=>{
      console.log(res);
      this.quizService.questionsData = res.results;
    }).catch((err)=>{
      console.log(err);
    });

  }

}
