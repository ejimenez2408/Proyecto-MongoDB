//import { PrismaClient } from '@prisma/client';
import { postPost,updatePost,deletePost,getPost,getPosts,updateCommentVotes } from '../libs/post.js';

//const prisma = new PrismaClient();

const postPostController = async (req, res) => {
    try{
        let body = req.body;
        console.log("Cuerpo Comentario", body)
        const resp = await postPost(body)
        if(resp){
            return res.status(201).json({message: 'Comentario Creado Correctamente!'})
        }else{
            return res.status(402).json({message: 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error.message)
        res.status(500).json({ error: 'Error al Crear el Comentario' });
    }
}

const updatePostController = async ({params,body},req, res) => {
    try{
        const { id } = params
        const resp = await updatePost(id,body)
        if(resp){
            return res.status(201).json({message: 'Comentario Actualizado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Actualizar el Comentario' });
    }
}

const deletePostController = async ({params},req, res) => {
    try{
        const { id } = params
        const resp = await deletePost(id)
        if(resp){
            return res.status(201).json({message: 'Comentario Eliminado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Eliminar el Comentario' });
    }
}

const getPostController = async ({params},req, res) => {
    try{
        const { id } = params
        const resp = await getPost(id)
        if(resp != false){
            res.status(201).send({status: 'success', data: resp})
        }else{
            res.status(402).send({status: 'error', message: 'No Hay Data'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Comentario' });
    }
}

const getPostsController = async (req, res) =>{
    try{
        const resp = await getPosts()
        res.status(201).send({status: 'success', data: resp})
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Comentarios' });
    }
}

const submitVote = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const voteType = req.params.voteType;

        const updatedComment = await updateCommentVotes(commentId, voteType);

        res.json({
            success: true,
            likeCount: updatedComment.like,
            dislikeCount: updatedComment.dislike,
        });
    } catch (error) {
        console.error('Error al procesar el voto:', error);
        res.status(500).json({ success: false, error: 'Error al procesar el voto' });
    }
};

export {postPostController,
        updatePostController,
        deletePostController,
        getPostController,
        getPostsController,
        submitVote}