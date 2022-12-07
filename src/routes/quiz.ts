import { Router } from "express"
import { checkSession } from "../middlewares/session"
import { getQuestionsQuiz, getTopQuiz, postQuiz } from "../controllers/quiz"
import { validateQuiz } from "../validators/quiz"

const router = Router()

router.post('/', checkSession,validateQuiz, postQuiz)
router.get('/ranking', checkSession, getTopQuiz)
router.get('/questions', checkSession, getQuestionsQuiz)

export { router }