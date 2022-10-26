/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/messages/MessageDao";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao()
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to insert messages into database
     * @param {string} from User id who is sending a message
     * @param {Message} message Message sent by user
     * @returns Promise To be notified when message is inserted into the database
     */
    userSendsMessage = async (from: string, message: Message): Promise<Message> =>
        MessageModel
            .create({...message, from: from})
            .catch(error => error);

    /**
     * Uses MessageModel to remove message from database
     * @param {string} mid Message id that has to be deleted
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel
            .deleteOne({_id: mid})
            .catch(error => error);

    /**
     * Uses MessageModel to retrieve a list of messages sent by the user
     * @param {string} from User id whose messages have to be retrieved
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findMessagesSent = async (from: string): Promise<Message[]> =>
        MessageModel
            .find({from: from})
            .populate("message")
            .exec()
            .catch(error => error);

    /**
     * Uses MessageModel to retrieve a messages received by the user
     * @param {string} to User id whose messages have to be retrieved
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findMessagesReceived = async (to: string): Promise<Message[]> =>
        MessageModel
            .find({to: to})
            .populate("message")
            .exec()
            .catch(error => error);
}