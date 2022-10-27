/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Uses BookmarkModel to insert bookmark into database
     * @param {string} tid Tuit id that is bookmarked
     * @param {string} uid User id who bookmarks
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel
            .create({bookmarkedTuit: tid, bookmarkedBy: uid})
            .catch(error => error);

    /**
     * Uses BookmarkModel to remove bookmark from database
     * @param {string} tid Tuit that has to be un-bookmarked
     * @param {string} uid User who bookmarked the tuit
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel
            .deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid})
            .catch(error => error);

    /**
     * Uses BookmarkModel to retrieve a list of tuits bookmarked by a user
     * @param {string} uid User id of the user who bookmarked tuits have to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from the database
     */
    findTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec()
            .catch(error => error);
}