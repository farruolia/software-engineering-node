/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/follows/FollowController";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/follows/:userBeingFollowed/user/:uid to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/unfollows/:userBeingUnfollowed/user/:uid to record that a user no longer follows the other user
 *     </li>
 *     <li>GET /api/users/:uid/followed to retrieve all the users the user is following
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users that follow the user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/follows/:userBeingFollowed/user/:uid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/unfollows/:userBeingUnfollowed/user/:uid", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/followed", FollowController.followController.findFollowedByUser);
            app.get("/api/users/:uid/following", FollowController.followController.findFollowingUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Uses FollowDao to insert follow into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters userBeingFollowed and uid representing the user that is following the other user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.userBeingFollowed, req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Uses FollowDao to remove follow into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters userBeingUnfollowed and uid representing the user that is unfollowing the other user
     * @param {Response} res Represents HTTP response, including status
     * on whether unfollowing the user was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.userBeingUnfollowed, req.params.uid)
            .then(status => res.send(status));

    /**
     * Uses FollowDao to retrieve a list of users the user is following
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Uses FollowDao to retrieve a list of users that follows the user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowingUser(req.params.uid)
            .then(follows => res.json(follows));
}