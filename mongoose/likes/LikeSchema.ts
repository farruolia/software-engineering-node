/**
 * @file Implements mongoose schema to map to a MongoDB Likes collection,
 * defines shape of the documents in Like
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Likes";

const LikeSchema = new mongoose.Schema<Like>({

    tuit: {
        type: Schema.Types.ObjectId,
        ref: "TuitModel"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "likes"});

export default LikeSchema;