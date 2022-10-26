/**
 * @file Declares Message data type representing relationships between
 * messages and users, as in which user has sent which user a message
 */
import User from "../users/User";

/**
 * @typedef Messages Represents message relationship between users,
 * as in which user messages which user, and what is in the message
 * @property {string} message The message sent by the user
 * @property {User} to The user who the message is going to
 * @property {User} from The user who sent the message
 * @property {Date} sentOn The date the message was sent
 */
export default interface Message {

    message: string,
    to: User,
    from: User,
    sentOn: Date
}