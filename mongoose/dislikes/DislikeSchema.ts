/**
 * @file Implements mongoose schema to map to a MongoDB Dislikes collection,
 * defines shape of the documents in Dislike
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

const DislikeSchema = new mongoose.Schema<Dislike>({

    tuit: {
        type: Schema.Types.ObjectId,
        ref: "TuitModel"
    },
    dislikedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "dislikes"});

export default DislikeSchema;