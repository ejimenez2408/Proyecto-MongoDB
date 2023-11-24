import { Router } from "express";
// import { passport } from "passport";
import {postPostController, updatePostController, deletePostController, getPostController, getPostsController} from '../controller/post.controller.js'

const router = Router()

router.get('/post/:placeId',getPostController)
router.get('/posts',getPostsController)
router.post('/post',postPostController)
router.put('/post/:id',updatePostController)
router.delete('/post/:id',deletePostController)

export default router;