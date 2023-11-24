//import { PrismaClient } from '@prisma/client';
import { postUser, updateUser, deleteUser, getUser, getUsers } from '../libs/user.js';

//const prisma = new PrismaClient();

const postUserController = async (req, res) => {
    try{
        let body = req.body;
        const resp = await postUser(body)
        if(resp){
            return res.status(201).json({message: 'Usuario Creado Correctamente!'})
        }else{
            return res.status(400).json({message: 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error al Crear el Usuario' });
    }
}

const updateUserController = async (req, res) => {
    try{
        let body = req.body
        let params = req.params
        const { id } = params
        const resp = await updateUser(id,body)
        if(resp){
            return res.status(201).json({message: 'Usuario Actualizado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Actualizar el Usuario' });
    }
}

const deleteUserController = async ({params},req, res) => {
    try{
        let params = req.params
        const { id } = params
        const resp = await deleteUser(id)
        if(resp){
            return res.status(201).json({message: 'Usuario Eliminado Correctamente!'})
        }else{
            return res.status(402).json({message : 'Se Presento Un Problema'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Eliminar el Usuario' });
    }
}

const getUserController = async (req, res) => {
    try{
        let id = req.params.id;
        const resp = await getUser(id)
        if(resp){
            res.status(201).send({status: 'success', data: resp})
        }else{
            res.status(402).send({status: 'error', message: 'No Hay Data'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Usuario' });
    }
}

const getUsersController = async (req, res) =>{
    try{
        const resp = await getUsers()
        res.status(201).send({status: 'success', data: resp})
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error al Buscar Usuarios' });
    }
}

export {postUserController,
        updateUserController,
        deleteUserController,
        getUserController,
        getUsersController}