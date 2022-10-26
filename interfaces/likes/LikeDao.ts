/**
 * @file Declares API for Likes related data access object methods.
 */
import Like from "../../models/likes/Likes";

export default interface LikeDaoI {

    /**
     * Uses LikeModel to retrieve a list of users that liked tuit
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;

    /**
     * Uses LikeModel to retrieve a list of tuits liked by user
     * @param {string} uid User id to find list of tuits liked by this user
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Uses LikeModel to remove like from database
     * @param {string} uid User id who is unliking
     * @param {string} tid Tuit id which is being unliked
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses LikeModel to insert like into database
     * @param {string} uid User id who is doing the liking
     * @param {string} tid Tuit id which is being liked
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit (tid: string, uid: String): Promise<Like>;
};