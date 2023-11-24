import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createToken } from '../libs/jwt.js'


const prisma = new PrismaClient();

export const login = async (req, res) => {
    let userFound;
    const { email, password } = req.body;

    try {
        if(!password || !email){
            return res.status(400).json({ message: "¡Por Favor Ingresar Los Datos Completos!"})
        }else{
            userFound = await prisma.user.findFirst({
                where: {
                    email : email,
                }
            });
            console.dir(userFound)
            console.log(email, password);
        }

        if(!userFound){
            return res.status(404).json({message: "User Not Found"});
        }
        console.log(userFound.password)
        if(password!=userFound.password){
            return res.status(400).json({message: "Credentials Invalid"});
        }
        const token = await createToken(userFound);
        res.cookie('token', token);
        res.send({
            id: userFound.id,
            name: userFound.name,
            username: userFound.username,
            email: userFound.email,
            create : userFound.createdAt
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

export const logout = (req, res) => {
    res.cookie('token', '');
    console.log('!Delete Token!');
    return res.status(200).json({message: '¡User Logged Out!'});
};

export const profile = async (req, res) => {

    const userFound = await prisma.miembro.findUnique({
        where: {
            id: req.decoded.id,
        }    
    });
    if(!userFound){
        return res.status(404).json({message: 'User Not Found'}); 
    }

    return res.status(200).json({
        id: userFound.id,
        email: userFound.email,
        username: userFound.username,
        create_time: userFound.createdAt
    });

};