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
      this.quizService.questionsData = res;
      this.quizService.questionsData = this.quizService.questionsData.slice(0, 3)
      this.quizService.questionsData[this.questionIndex].incorrect_answers.push(this.quizService.questionsData[this.questionIndex].correct_answer);
      this.quizService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());
      let timer = setInterval(()=>{
        if (this.userAnswer == "" && this.countdown != 0) {
          this.countdown --;
        }
        if (this.countdown == 0) {
          clearInterval(timer);
          this.quizService.updateScore(this.score);
          setTimeout(()=>{
            this.router.navigate(['/home']);
          }, 4000);
        }
      }, 1000);
    }).catch((err)=>{
      console.log(err);
    });

  }

  username = this.quizService.userName;
  questionIndex = 0;
  userAnswer = "";
  score = 0;
  countdown = 15;
  isCongratulation = false;

  selectAnswer(option: string) {
    this.userAnswer = option;

    if (this.quizService.questionsData[this.questionIndex].correct_answer == option)
    {
      this.score += 5;
    
       setTimeout(()=>{
        // alert("questionIndex: " + this.questionIndex)
        // alert("questionsData.length: " + (this.quizService.questionsData.length-1))
        if (this.questionIndex < this.quizService.questionsData.length-1)
        {
        this.userAnswer = "";
        this.questionIndex++;
        this.quizService.questionsData[this.questionIndex].incorrect_answers.push(this.quizService.questionsData[this.questionIndex].correct_answer);
        this.quizService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());
        this.countdown = 15;
        }
        else 
        {
          // alert("Quiz well done");
          this.isCongratulation = true;
          this.quizService.questionsData = [];
          this.quizService.updateScore(this.score);
          setTimeout(()=>{
            this.router.navigate(['/home']);
          }, 4000);
        }

       }, 1000);
    }
    else {
      this.quizService.updateScore(this.score);
      setTimeout(()=>{
        this.router.navigate(['/home']);
      }, 4000);
    }
  }

}
