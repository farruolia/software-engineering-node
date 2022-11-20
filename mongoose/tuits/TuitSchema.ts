/**
 * @file Implements mongoose schema to map to a MongoDB Tuits collection,
 * defines shape of the documents in tuit
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    stats: {
        replies: {
            type: Number,
            default: 0
        },
        retuits: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String
}, {collection: "tuits"});

export default TuitSchema;


