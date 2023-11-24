import { Router } from "express";
// import passport from "passport";
import {postUserController, updateUserController, deleteUserController, getUserController, getUsersController} from '../controller/user.controller.js'

const router = Router()

router.get('/user/:id',getUserController)
router.get('/users',getUsersController)
router.post('/user',postUserController)
router.put('/user/:id',updateUserController)
router.delete('/user/:id',deleteUserController)

export default router;