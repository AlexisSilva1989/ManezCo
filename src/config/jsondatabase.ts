import lowdb from "lowdb"
import FileSync from "lowdb/adapters/FileAsync"
import { join } from "path"
import { IQuestion } from "src/interfaces/question.interface"
import { IUser } from "src/interfaces/user.interface"

type Schema = {
  users: IUser[]
  questions: IQuestion[]
  top: {
    email: string
    points: number
  }[]
}

let db: lowdb.LowdbAsync<Schema>

export const createConnection = async () => {
  const PATH_CONFIG = `${__dirname}`
  const fileUser = join(PATH_CONFIG, '../data/jsondatabase.json')
  const adapter = new FileSync<Schema>(fileUser)
  db = await lowdb(adapter)
  db.defaults({ users: [], questions: [] , top: []}).write()
}

export const getConnection = () => db
