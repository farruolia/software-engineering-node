/**
 * @file Declares API for Bookmarks related controller
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {

    /**
     * Uses BookmarkModel to insert bookmark into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters tid and uid representing the tuit bookmarked by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit (req: Request, res: Response): void;

    /**
     * Uses BookmarkModel to remove bookmark from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters tid and uid representing the tuit that is un-bookmarked by the user
     * @param {Response} res Represents HTTP response, including status
     * on whether un-bookmarking the tuit was successful or not
     */
    userUnbookmarksTuit (req: Request, res: Response): void;

    /**
     * Uses BookmarkModel to retrieve a list of tuits bookmarked by a user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findTuitsBookmarkedByUser (req: Request, res: Response): void;
}