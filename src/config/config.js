import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT_MONGODB || 3001,
    dbUrl: process.env.URL_MONGODB || 'mongodb://localhost/test',
    key : process.env.KEY_SECRET
}
