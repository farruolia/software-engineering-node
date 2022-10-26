/**
 * @file Declares Tuit data type representing user's tuits
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents a tuit
 * @property {String} tuit Tuit posted by a user
 * @property {User} postedBy User who posted the tuit
 * @property {Date} postedOn Date on which user posted tuit
 * @property {String} image Image posted with tuit
 * @property {String} youtube Youtube link posted with tuit
 * @property {String} avatarLogo User's avatar logo
 * @property {String} imageOverlay Tuit's image overlay
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String
};