/**
 * @file Declares API for Dislikes related data access object methods.
 */
import Dislike from "../../models/dislikes/Dislike";

export default interface DislikeDaoI {

    /**
     * Uses DislikeModel to retrieve a list of users that disliked tuit
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the dislikes are retrieved from the database
     */
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;

    /**
     * Uses DislikeModel to retrieve a list of tuits disliked by user
     * @param {string} uid User id to find list of tuits disliked by this user
     * @returns Promise To be notified when the dislikes are retrieved from the database
     */
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;

    /**
     * Uses DislikeModel to remove dislike from database
     * @param {string} uid User id who is undisliking
     * @param {string} tid Tuit id which is being undisliked
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUnDislikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses DislikeModel to insert dislike into database
     * @param {string} uid User id who is doing the disliking
     * @param {string} tid Tuit id which is being disliked
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit (tid: string, uid: String): Promise<Dislike>;
};