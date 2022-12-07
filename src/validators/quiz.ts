import { check } from "express-validator"
import { validationResult } from "express-validator/src/validation-result"

export const validateQuiz = [
  check("quizResponse").exists().notEmpty().isArray()

]