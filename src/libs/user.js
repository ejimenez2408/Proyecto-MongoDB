import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include : {
            posts : true,
        }
    });
    return users;
}

export const getUser = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    return user;
}

export const postUser = async (body) => {
    let { username, email, password} = body;
    const user = await prisma.user.create({
        data: { username: username, 
                email: email, 
                password: password
            },
    });
    return user;
}

export const updateUser = async (req, res) => {
    let id = req.params.id;
    let { username, email, password} = req.body;
    const user = await prisma.user.update({
        where: { id: id },
        data: { username: username, 
                email: email, 
                password: password
            },
    });
    return user;
}

export const deleteUser = async (req, res) => {
    let id = req.params.id;
    const user = await prisma.user.delete({
        where: { id: id },
    });
    return user;
}