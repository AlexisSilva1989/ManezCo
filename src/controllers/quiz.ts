import { Request, Response } from "express";
import { RequestExt } from "../interfaces/auth.interface";
import { IResponseQuiz } from "../interfaces/question.interface";
import { getQuestionsQuizService, getTopQuizService } from "../services/quiz.services";
import { getConnection } from "../config/jsondatabase";
import { handleHttp } from "../utils/error.handle";

export const getTopQuiz = (_req: Request ,res: Response ) => {
  try {
    res.json(getTopQuizService())
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS", error)
  }
}

export const getQuestionsQuiz = (_req: Request ,res: Response ) => {
  try {
    res.json(getQuestionsQuizService())
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS", error)
  }
}

export const postQuiz = ({ user, body }: RequestExt, res: Response) => {
  try {
    const responsesQuiz: IResponseQuiz[] = body.quizResponse

    const totalPoints = 100
    const totalQuestions = responsesQuiz.length
    const valueResponseAcerted = totalPoints / totalQuestions
    const numberOfPointsEarn = getNumberOfPointsEarn(responsesQuiz)
    const pointsQuiz = valueResponseAcerted * numberOfPointsEarn

    addTop(user!.id, pointsQuiz);

    const response = {
      usurio: user!.id,
      totalQuizPoints: totalPoints,
      totalQuestions: totalQuestions,
      correctTotalAnswers: numberOfPointsEarn,
      totalUserPoints: pointsQuiz,
      quizResult: getResultQuiz(totalPoints, pointsQuiz)
    }

    res.json(response)

  } catch (error) {
    handleHttp(res, "ERROR_QUIZ_RESULTS", error)
  }
}

const getResultQuiz = (totalPoints: number, pointsQuiz: number): string => {
  const successRate = pointsQuiz >= (totalPoints * 50 / 100)
  console.log('successRate: ', successRate);
  return successRate ? "Passed" : "Failed"
}

const getNumberOfPointsEarn = (responsesQuiz: IResponseQuiz[]) => {

  const questions = getConnection().get('questions').value();
  const totalAcerted = responsesQuiz.reduce((count: number, response: IResponseQuiz) => {
    const questionFind = questions.find(question => question.id === response.id)
    if (questionFind && response.answer) {
      if (questionFind.answer.includes(response.answer)) return ++count
    }

    return count
  }, 0)

  return totalAcerted
}

const addTop = (email: string, points: number) => {
  const existTop = getConnection().get('top').find({ email }).value()
  if(!existTop){
    getConnection().get('top').push({email , points}).write()
    return
  }

  if (existTop.points < points){
    getConnection().get('top').find({email}).assign({email , points}).write()
  }
}