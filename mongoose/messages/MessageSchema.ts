/**
 * @file Implements mongoose schema to map to a MongoDB Message collection,
 * defines shape of the documents in Message
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";
import User from "../../models/users/User";

const MessageSchema = new mongoose.Schema<Message>({

    message: {
        type: String,
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    sentOn: {
        type: Date,
        default: Date.now
    }
}, {collection: "messages"})

export default MessageSchema;