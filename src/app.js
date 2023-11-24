import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from "morgan";
import bodyParser from 'body-parser';
import passport from "passport";
import cookie from "cookie-parser";
import passportJWT from "./middlewares/passport.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js"
import placeTurist from "./routes/placeTurist.routes.js"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie());
//app.use(passport.initialize());
//passport.use(passportJWT);

// app.use('views', express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({ urlencoded: false}));

//routes
app.use(userRoutes)
app.use(postRoutes)
app.use(authRoutes)
app.use(placeTurist)


export default app;