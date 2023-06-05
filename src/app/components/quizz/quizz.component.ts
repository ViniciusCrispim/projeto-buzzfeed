import { Component, OnInit } from '@angular/core';
import quizz_questions from"../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questoes:any
  questaoEscolhida:any

  respostas:string[] = []
  respostaSelecionada:string = ""

  questaoIndex:number = 0
  questaoMaxIndex:number = 0

  terminou:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.terminou = false
      this.title = quizz_questions.title

      this.questoes = quizz_questions.questions
      this.questaoEscolhida = this.questoes[this.questaoIndex]

      this.questaoMaxIndex = this.questoes.length
    }
  }

  escolhaJogador(valor:string){
    this.respostas.push(valor)
    this.proximoPasso()

  }

  async proximoPasso(){
    this.questaoIndex +=1

    if(this.questaoMaxIndex > this.questaoIndex){
      this.questaoEscolhida = this.questoes[this.questaoIndex]
    } else {
      const resultadoFinal:string = await this.verificarResultado(this.respostas)
      this.terminou = true
      this.questaoEscolhida = quizz_questions.results[resultadoFinal as keyof typeof quizz_questions.results]
    }
  }

  async verificarResultado(respostas:string[]){
     const resultado = respostas.reduce((previous, current , i, arr) =>{
        if(
          arr.filter(item => item === previous).length > 
          arr.filter(item => item === current).length
          ){
            return previous
          }else {
            return current
          }
     })

     return resultado
  }

}
