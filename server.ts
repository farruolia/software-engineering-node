/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthController";
import DislikeController from "./controllers/DislikeController";


// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "farruolia";
const DB_PASSWORD = "farruolia98";
const HOST = "cluster0.xyj3lm6.mongodb.net";
const DB_NAME = "tuiterDB";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);

var cors = require('cors')
const corsConfig = {
    credentials: true,
    origin: 'https://farruolia-tuiter-backend.herokuapp.com/'
};

const session = require("express-session");
const app = express();
app.use(cors(corsConfig));
app.use(express.json());
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

let sess = {
    secret: "SECRET",
    cookie: {
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

/**
 * create RESTful Web service API
 */
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authenticationController = AuthenticationController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
