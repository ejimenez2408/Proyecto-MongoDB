import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async () => {
    const posts = await prisma.post.findMany();
    return posts;
}

export const getPost = async (req, res) => {
    let id = req.params.id;
    const post = await prisma.post.findUnique({
        where: { id: id },
    });
    return post;
}

export const postPost = async (body) => {
    let { like, dislike, username, placeId, content } = body;
    const post = await prisma.post.create({
        data: { like: parseInt(like), 
                dislike: parseInt(dislike),
                username : username,
                placeId : placeId,
                content: content
            },
    });
    return post;
}

export const updatePost = async (req, res) => {
    let id = req.params.id;
    let { content, like, dislike } = req.body;
    const post = await prisma.post.update({
        where: { id: id },
        data: { content: content, 
                like: like, 
                dislike: dislike
            },
    });
    return post;
}

export const deletePost = async (req, res) => {
    let id = req.params.id;
    const post = await prisma.post.delete({
        where: { id: id },
    });
    return post;
}
