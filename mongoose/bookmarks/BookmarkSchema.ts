/**
 * @file Implements mongoose schema to map to a MongoDB Bookmarks collection,
 * defines shape of the documents in Bookmark
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({

    bookmarkedTuit: {
        type: Schema.Types.ObjectId,
        ref: "TuitModel"
    },
    bookmarkedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "bookmarks"})

export default BookmarkSchema;