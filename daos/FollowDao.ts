/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follows/FollowDao";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao()
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to insert follow into database
     * @param {string} uid User id who is doing the following
     * @param {string} userBeingFollowed User id who is being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser = async (userBeingFollowed: string, uid: string): Promise<Follow> =>
        FollowModel
            .create({userBeingFollowed: userBeingFollowed, userFollowing: uid})
            .catch(error => error);

    /**
     * Uses FollowModel to remove follow from database
     * @param {string} uid User id who is unfollowing
     * @param {string} userBeingUnfollowed User id who is being unfollowed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsAnotherUser = async (userBeingUnfollowed: string, uid: string): Promise<any> =>
        FollowModel
            .deleteOne({userBeingUnfollowed: userBeingUnfollowed, user: uid})
            .catch(error => error);

    /**
     * Uses FollowModel to retrieve a list of users the user is following
     * @param {string} uid User id whose list of users they are following is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userBeingFollowed")
            .exec()
            .catch(error => error);

    /**
     * Uses FollowModel to retrieve a list of users that follows the user
     * @param {string} uid User id whose list of users following them is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userBeingFollowed: uid})
            .populate("userFollowing")
            .exec()
            .catch(error => error);

    /**
     * Uses FollowModel to retrieve a list of users that another user is following
     * @param {string} uid User id whose list of users they are following is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowedByOtherUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userBeingFollowed")
            .exec()
            .catch(error => error);

    /**
     * Uses FollowModel to retrieve a list of users that follows another user
     * @param {string} uid User id whose list of users following them is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowingByOtherUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userBeingFollowed")
            .exec()
            .catch(error => error);

}