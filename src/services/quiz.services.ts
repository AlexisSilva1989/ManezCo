import { IQuestion } from "src/interfaces/question.interface"
import { getConnection } from "../config/jsondatabase"

export const getTopQuizService = () => {
  return getConnection().get('top').orderBy(["points","email"],"desc").value()
}

export const getQuestionsQuizService = () => {
  const questions : IQuestion[]= getConnection().get('questions').orderBy("id").value()

  return questions.map( (quest : IQuestion) => {
    const {id , question, options} = quest
    return { id, question, options}
  })
}