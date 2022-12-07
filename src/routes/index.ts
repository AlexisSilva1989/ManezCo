import { Router } from "express"
import { readdirSync } from "fs"

const PATH_ROUTER = `${__dirname}`
const router = Router()

/**
 * clear filename
 * @param fileName 
 * @returns clean file name
 */
const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift()
  return file
}

/**
 * load routes dynamically
 */
readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== "index") {
    console.log(`loading route: /${cleanName}`);
    import(`./${cleanName}`)
      .then((moduleRouter) => {
        router.use(`/${cleanName}`, moduleRouter.router)
      }).catch((e) => {
        console.log("Routes were not loaded", e);
      })
  }
})

export { router }