import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";
import AuthControllerI from "../interfaces/auth/AuthController";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class AuthenticationController implements AuthControllerI {

    private static userDao: UserDao = UserDao.getInstance();
    private static authenticationController: AuthenticationController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authenticationController === null) {
            AuthenticationController.authenticationController = new AuthenticationController();
            app.post("/api/auth/login", AuthenticationController.authenticationController.login);
            app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
            app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
            app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
        }
        return AuthenticationController.authenticationController;
    }

    private constructor() {}

    signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);

        const existingUser = await AuthenticationController.userDao.findUserByUsername(req.body.username);

        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = await AuthenticationController.userDao.createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            await res.json(insertedUser);
        }
    }

    profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await AuthenticationController.userDao.findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };
}