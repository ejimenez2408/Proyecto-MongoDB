import { Router } from "express";
// import passport from "passport";
import {postPlaceTuristController, updatePlaceTuristController, deletePlaceTuristController, getPlaceTuristController, getPlaceTuristsController, getPlaceTuristsByCityController} from "../controller/placeTurist.controller.js"

const router = Router()

router.get('/placeTurist/:id',getPlaceTuristController)
router.get('/placeTurists',getPlaceTuristsController)
router.post('/placeTurist',postPlaceTuristController)
router.put('/placeTurist/id',updatePlaceTuristController)
router.delete('/placeTurist/id',deletePlaceTuristController)
router.get('/placeTuristsByCity', getPlaceTuristsByCityController);

export default router;