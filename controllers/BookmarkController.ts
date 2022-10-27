/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkController";
import BookmarkDao from "../daos/BookmarkDao";
import {Express, Request, Response} from "express";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/bookmarks/:tid/user/:uid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/unbookmarks/:tid/user/:uid to record that a user no longer bookmarks a tuit
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by the user
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/user/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/user/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findTuitsBookmarkedByUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Uses BookmarkModel to insert bookmark into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters tid and uid representing the tuit bookmarked by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Uses BookmarkModel to remove bookmark from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters tid and uid representing the tuit that is un-bookmarked by the user
     * @param {Response} res Represents HTTP response, including status
     * on whether un-bookmarking the tuit was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Uses BookmarkModel to retrieve a list of tuits bookmarked by a user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
}