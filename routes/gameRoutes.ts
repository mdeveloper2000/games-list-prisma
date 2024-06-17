import express, { Router } from "express"
import { GameController } from "../controllers/gameController.js"
const router: Router = express.Router()
const gameController: GameController = new GameController()

router.get("/", gameController.list)
router.get("/create", gameController.create)
router.post("/store", gameController.store)
router.get("/game/:id", gameController.read)
router.get("/game/show/:id", gameController.show)
router.put("/update", gameController.update)
router.get("/destroy/:id", gameController.destroy)
router.get("/search/:search/:order", gameController.search)
router.all("*", gameController.notfound)

export default router