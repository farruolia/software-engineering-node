/**
 * @file Declares Bookmark data type representing relationships between
 * users and tuits, as in which user bookmarked which tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmark relationship between users and tuits,
 * as in which user bookmarked which tuit
 * @property {Tuit} bookmarkedTuit Tuit that is bookmarked
 * @property {User} bookmarkedBy User that bookmarks tuit
 */
export default interface Bookmark {

    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};