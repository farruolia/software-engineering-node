import mongoose from "mongoose";
import User from "../models/User";

const TuitSchema = new mongoose.Schema({

    tuit: {
        type: String, 
        required: true
    },
    postedOn: {
        type: Date
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {collection: 'tuits'});

export default TuitSchema;


