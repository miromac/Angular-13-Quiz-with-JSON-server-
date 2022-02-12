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
      this.quizService.questionsData[this.questionIndex].incorrect_answers.push(this.quizService.questionsData[this.questionIndex].correct_answer);
      this.quizService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());
      
    }).catch((err)=>{
      console.log(err);
    });

  }

  questionIndex = 0;

}
