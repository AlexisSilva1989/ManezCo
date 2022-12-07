import { Router } from "express"
import { loginCtrl } from "../controllers/auth"

const router = Router()

/*** /auth/login [POST] */
router.post('/login', loginCtrl)

export { router }