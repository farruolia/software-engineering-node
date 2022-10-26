/**
 * @file Declares API for Bookmarks related data access object methods.
 */
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {

    /**
     * Uses BookmarkModel to insert bookmark into database
     * @param {string} tid Tuit id that is bookmarked
     * @param {string} uid User id who bookmarks
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;

    /**
     * Uses BookmarkModel to remove bookmark from database
     * @param {string} tid Tuit that has to be un-bookmarked
     * @param {string} uid User who bookmarked the tuit
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses BookmarkModel to retrieve a list of tuits bookmarked by a user
     * @param {string} uid User id of the user who bookmarked tuits have to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from the database
     */
    findTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
}