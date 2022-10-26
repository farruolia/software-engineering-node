/**
 * @file Declares API for Messages related controller
 */
import {Request, Response} from "express";

export default interface MessageControllerI {

    /**
     * Uses MessageModel to insert messages into database
     * @param {Request} req Represents HTTP request, including the
     * path parameter from and body containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage (req: Request, res: Response): void;

    /**
     * Uses MessageModel to remove message from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters mid representing the message that is to be deleted
     * @param {Response} res Represents HTTP response, including status
     * on whether message deletion was successful or not
     */
    userDeletesMessage (req: Request, res: Response): void;

    /**
     * Uses MessageModel to retrieve a list of messages sent by the user
     * @param {Request} req Represents HTTP request, including the path parameter from representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSent (req: Request, res: Response): void;

    /**
     * Uses MessageModel to retrieve a messages received by the user
     * @param {Request} req Represents HTTP request, including the path parameter to representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceived (req: Request, res: Response): void;
}