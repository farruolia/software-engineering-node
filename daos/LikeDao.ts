/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/likes/LikeDao";
import Like from "../models/likes/Likes";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {

    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {

        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve a list of tuits liked by user
     * @param {string} uid User id to find list of tuits liked by this user
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec()
            .catch(error => error);

    /**
     * Uses LikeModel to retrieve a list of users that liked tuit
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec()
            .catch(error => error);

    /**
     * Uses LikeModel to insert like into database
     * @param {string} uid User id who is doing the liking
     * @param {string} tid Tuit id which is being liked
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel
            .create({tuit: tid, likedBy: uid})
            .catch(error => error);

    /**
     * Uses LikeModel to remove like from database
     * @param {string} uid User id who is unliking
     * @param {string} tid Tuit id which is being unliked
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel
            .deleteOne({tuit: tid, likedBy: uid})
            .catch(error => error);
}