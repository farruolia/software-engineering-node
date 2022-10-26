/**
 * @file Declares API for Follows related controller
 */
import {Request, Response} from "express";

export default interface FollowControllerI {

    /**
     * Uses FollowDao to insert follow into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters userBeingFollowed and uid representing the user that is following the other user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser (req: Request, res: Response): void;

    /**
     * Uses FollowDao to remove follow into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters userBeingUnfollowed and uid representing the user that is unfollowing the other user
     * @param {Response} res Represents HTTP response, including status
     * on whether unfollowing the user was successful or not
     */
    userUnfollowsAnotherUser (req: Request, res: Response): void;

    /**
     * Uses FollowDao to retrieve a list of users the user is following
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findFollowedByUser (req: Request, res: Response): void;

    /**
     * Uses FollowDao to retrieve a list of users that follows the user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findFollowingUser (req: Request, res: Response): void;

    /**
     * Uses FollowDao to retrieve a list of users that another user is following
     * @param {Request} req Represents HTTP request
     * @param {Response} res Represents HTTP response
     * findFollowedByOtherUser (req: Request, res: Response): void;
     */

    /**
     * Uses FollowDao to retrieve a list of users that follows another user
     * @param {Request} req Represents HTTP request
     * @param {Response} res Represents HTTP response
     * findFollowingByOtherUser (req: Request, res: Response): void;
     */

}