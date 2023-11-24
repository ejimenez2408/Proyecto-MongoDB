import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPlaceTurists = async (req,res) => {
    const placeTurists = await prisma.placeTurist.findMany()
    return placeTurists;
}

const incrementVisitCount = async (placeId) => {
    await prisma.placeTurist.update({
        where: { id: placeId },
        data: {
            visit: {
                increment: 1,
            }
        },
    });
};

export const getPlaceTurist = async (id) => {
    const placeTurist = await prisma.placeTurist.findUnique({
        where: { id: id },
        include : {
            posts : true,
        }
    });
    return placeTurist;
}

export const postPlaceTurist = async (body) => {
    let { namePlace, description, address, image, city } = body;
    const placeTurist = await prisma.placeTurist.create({
        data: { namePlace : namePlace,
                description : description,
                address : address,
                image : image,
                city : city
            },
    });
    return placeTurist;
}

export const updatePlaceTurist = async (req, res) => {
    let id = req.params.id;
    let { namePlace, description, address, image, city } = req.body;
    const placeTurist = await prisma.placeTurist.update({
        where: { id: id },
        data: { namePlace : namePlace,
                description : description,
                address : address,
                image : image,
                city : city
            },
    });
    return placeTurist;
}

export const deletePlaceTurist = async (req, res) => {
    let id = req.params.id;
    const placeTurist = await prisma.placeTurist.delete({
        where: { id: id },
    });
    return placeTurist;
}

export { incrementVisitCount};