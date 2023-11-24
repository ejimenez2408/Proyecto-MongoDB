import { Strategy, ExtractJwt  } from "passport-jwt";
import { config } from "../config/config.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const options = {

    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            let token = null;
            if (req && req.cookies) {
            token = req.cookies.token; // Reemplaza 'jwt' con el nombre de tu cookie
            }
            return token;
        },
        ]),
    secretOrKey : config.key
};

export default new Strategy(options, async (payload, done) => {
    try {
        let id = payload.id
        const userFind = await prisma.user.findUnique({
            where: {
                id: id
            }    
        });
    
        if(userFind){
            return done(null, userFind);
        }
    
        return done(null, false);
    
    } catch (error) {
            console.error(error);
    }

});