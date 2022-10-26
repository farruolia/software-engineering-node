/**
 * @file Implements mongoose schema to map to a MongoDB Users collection,
 * defines shape of the documents in user
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        default: `testusername${Date.now()}`
    },
    password: {
        type: String,
        required: true,
        default: `testpassword${Date.now()}`
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        default: `testemail${Date.now()}`
    },
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {
        type: String,
        enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]
    },
    maritalStatus: {
        type: String,
        enum: ["MARRIED", "SINGLE", "WIDOWED"]
    },
    location: {
        latitude: {
            type: Number,
            default: 0.0}
        ,
        longitude: {
            type: Number,
            default: 0.0
        },
    },
    salary: {
        type: Number,
        default: 50000
    },
    joined: {
        type: Date,
        default: Date.now
    }
}, {collection: "users"});

export default UserSchema;