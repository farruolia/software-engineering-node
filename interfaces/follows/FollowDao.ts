/**
 * @file Declares API for Follows related data access object methods.
 */
import Follow from "../../models/follows/Follow";

export default interface FollowDaoI {

    /**
     * Uses FollowModel to insert follow into database
     * @param {string} uid User id who is doing the following
     * @param {string} userBeingFollowed User id who is being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser (userBeingFollowed: string, uid: string): Promise<Follow>;

    /**
     * Uses FollowModel to remove follow from database
     * @param {string} uid User id who is doing the unfollowing
     * @param {string} userBeingUnfollowed User id who is being unfollowed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsAnotherUser (userBeingUnfollowed: string, uid: string): Promise<any>;

    /**
     * Uses FollowModel to retrieve a list of users the user is following
     * @param {string} uid User id whose list of users they are following is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowedByUser (uid: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve a list of users that follows the user
     * @param {string} uid User id whose list of users following them is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowingUser (uid: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve a list of users that another user is following
     * @param {string} uid User id whose list of users they are following is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowedByOtherUser (uid: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve a list of users that follows another user
     * @param {string} uid User id whose list of users following them is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from the database
     */
    findFollowingByOtherUser (uid: string): Promise<Follow[]>;
}