import { PrismaClient } from '@prisma/client';
import { postPlaceTurist, updatePlaceTurist, deletePlaceTurist, getPlaceTurist, getPlaceTurists, incrementVisitCount } from '../libs/placeTurist.js';
import { postPost,updatePost,deletePost,getPost,getPosts } from '../libs/post.js';

const prisma = new PrismaClient();

const postPlaceTuristController = async (req, res) => {
    try{
        let body = req.body;
        const resp = await postPlaceTurist(body)
        if(resp){
            return res.status(201).json({message: 'Sitio Turistico Creado Correctamente!'})
        }else{
            return res.status(402).json({message: 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Crear el Sitio Turistico' });
    }
}

const updatePlaceTuristController = async ({params,body},req, res) => {
    try{
        const { id } = params
        const resp = await updatePlaceTurist(id,body)
        if(resp){
            return res.status(201).json({message: 'Sitio Turistico Actualizado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Actualizar el Sitio Turistico' });
    }
}

const deletePlaceTuristController = async ({params},req, res) => {
    try{
        const { id } = params
        const resp = await deletePlaceTurist(id)
        if(resp){
            return res.status(201).json({message: 'Sitio Turistico Eliminado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Eliminar el Sitio Turistico' });
    }
}

const getPlaceTuristController = async (req, res) => {
    try{
        // let body = req.body;
        let id  = req.params.id;
        const { visit } = req.query;
        const resp = await getPlaceTurist(id)
        if(resp){
            if (visit === 'true') {
                await incrementVisitCount(id);
            }
            resp.posts = resp.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            resp.posts.forEach(comment => {
                comment.formattedDate = new Date(comment.createdAt).toLocaleString();
            });
            // const coment = await postPost(body)
            //res.status(201).send({status: 'success', data: resp})
            res.render('detailTurist.ejs', {placeTurist : resp, message: 'Comentario Creado Correctamente'});
        }else{
            res.status(402).send({status: 'error', message: 'No Hay Data'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Sitio Turistico' });
    }
}

const getPlaceTuristsController = async (req, res) =>{
    try{
        const resp = await getPlaceTurists()
        //res.status(201).send({status: 'success', data: resp})
        res.render('turist.ejs', {placeTurists : resp});
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Sitios Turisticos' });
    }
}

const getPlaceTuristsByCityController = async (req, res) => {
    try {
        const city = req.query.city;
        let placeTurists;
        if (city) {
            placeTurists = await prisma.placeTurist.findMany({
                where: {
                    city: city,
                },
            });
        } else {
            placeTurists = await prisma.placeTurist.findMany();
        }

        res.status(200).json(placeTurists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar sitios turísticos por ciudad' });
    }
};

export {postPlaceTuristController,
        updatePlaceTuristController,
        deletePlaceTuristController,
        getPlaceTuristController,
        getPlaceTuristsController,
        getPlaceTuristsByCityController}