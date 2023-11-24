import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function createToken(user){

    const token = jwt.sign({id: user.id, email: user.email}, config.key, {
        expiresIn: 43200
    });
    
    return token; 
}