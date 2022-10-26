/**
 * @file Controller RESTful Web service API for message resource
 */
import MessageControllerI from "../interfaces/messages/MessageController";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import Message from "../models/messages/Message";

/**
 * @class FollowController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/messages/:from to record a message sent from a user
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that a message to be deleted
 *     </li>
 *     <li>GET /api/messages/sent/:from to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/messages/sent/:to to retrieve all messages sent to a user
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/messages/:from", MessageController.messageController.userSendsMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
            app.get("/api/messages/sent/:from", MessageController.messageController.findMessagesSent);
            app.get("/api/messages/sent/:to", MessageController.messageController.findMessagesReceived);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Uses MessageModel to insert messages into database
     * @param {Request} req Represents HTTP request, including the
     * path parameter from and body containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.from, req.body)
            .then((message: Message) => res.json(message));

    /**
     * Uses MessageModel to remove message from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters mid representing the message that is to be deleted
     * @param {Response} res Represents HTTP response, including status
     * on whether message deletion was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Uses MessageModel to retrieve a list of messages sent by the user
     * @param {Request} req Represents HTTP request, including the path parameter from representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSent(req.params.from)
            .then(messages => res.json(messages));

    /**
     * Uses MessageModel to retrieve a messages received by the user
     * @param {Request} req Represents HTTP request, including the path parameter to representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceived(req.params.to)
            .then(messages => res.json(messages));
}