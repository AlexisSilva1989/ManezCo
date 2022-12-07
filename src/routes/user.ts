import { Router } from "express"
import { checkSession } from "../middlewares/session"
import { createUsers, getUsers, countUsers, getUser, deleteUser, updateUser } from "../controllers/user"

const router = Router()

router.get('/', checkSession, getUsers)
router.get('/count',checkSession, countUsers)
router.post('/',checkSession, createUsers)
router.get('/:id',checkSession, getUser)
router.delete('/:id',checkSession, deleteUser)
router.put('/:id',checkSession, updateUser)

export { router }