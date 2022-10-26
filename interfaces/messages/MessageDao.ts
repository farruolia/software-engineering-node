/**
 * @file Declares API for Messages related data access object methods.
 */
import Message from "../../models/messages/Message";

export default interface MessageDaoI {

    /**
     * Uses MessageModel to insert messages into database
     * @param {string} from User id who is sending a message
     * @param {Message} message Message sent by user
     * @returns Promise To be notified when message is inserted into the database
     */
    userSendsMessage (from: string, message: Message): Promise<Message>;

    /**
     * Uses MessageModel to remove message from database
     * @param {string} mid Message id that has to be deleted
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage (mid: string): Promise<any>;

    /**
     * Uses MessageModel to retrieve a list of messages sent by the user
     * @param {string} from User id whose messages have to be retrieved
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findMessagesSent (from: string): Promise<Message[]>;

    /**
     * Uses MessageModel to retrieve a messages received by the user
     * @param {string} to User id whose messages have to be retrieved
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findMessagesReceived (to: string): Promise<Message[]>;
}