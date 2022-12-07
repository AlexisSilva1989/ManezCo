export interface IQuestion {
  id: number
  question: string
  options: {
    id:number
    option:string 
  }
  answer: number[]
}

export interface IResponseQuiz {
  id: number
  answer: number | null
}