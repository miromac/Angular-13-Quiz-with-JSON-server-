import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(public quizService:QuizService, private router:Router) { }

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
  userAnswer = "";
  score = 0;

  selectAnswer(option: string) {
    this.userAnswer = option;
    
    if (this.quizService.questionsData[this.questionIndex].correct_answer == option)
    {
      this.score += 5;
    
      setTimeout(()=>{
        this.userAnswer = "";
        this.questionIndex++;
        this.quizService.questionsData[this.questionIndex].incorrect_answers.push(this.quizService.questionsData[this.questionIndex].correct_answer);
        this.quizService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());
        
      }, 2000);
    }
    else {
      setTimeout(()=>{
        this.router.navigate(['/home']);
      }, 2000);
    }
  }

}
