/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/dislikes/DislikeDao";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/likes/LikeModel";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {

        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve a list of tuits disliked by user
     * @param {string} uid User id to find list of tuits disliked by this user
     * @returns Promise To be notified when the dislikes are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate("tuit")
            .exec()
            .catch(error => error);

    /**
     * Uses DislikeModel to retrieve a list of users that disliked tuit
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the dislikes are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec()
            .catch(error => error);

    /**
     * Uses DislikeModel to insert dislike into database
     * @param {string} uid User id who is doing the disliking
     * @param {string} tid Tuit id which is being disliked
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel
            .create({tuit: tid, dislikedBy: uid})
            .catch(error => error);

    /**
     * Uses DislikeModel to remove dislike from database
     * @param {string} uid User id who is undisliking
     * @param {string} tid Tuit id which is being undisliked
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel
            .deleteOne({tuit: tid, dislikedBy: uid})
            .catch(error => error);

    /**
     * Uses DislikeModel to retrieve a particular tuit disliked by the user
     * @param {string} uid User id
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the dislike is retrieved from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne(
            {tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to count how many users disliked a tuit
     * @param {string} tid Tuit id which is being disliked by users
     * @returns Promise To be notified when dislike is removed from the database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});

}