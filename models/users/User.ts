/**
 * @file Declares User data type representing users in Tuiter
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a user
 * @property {String} username User's username
 * @property {String} password User's password
 * @property {String} email User's email address
 * @property {String} firstName User's first name
 * @property {String} lastName User's last name
 * @property {String} profilePhoto User's profile photograph
 * @property {String} headerImage User's header image
 * @property {String} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {AccountType} accountType User's account type
 * @property {MaritalStatus} maritalStatus User's marital status
 * @property {Location} location User's geographical location
 * @property {Number} salary User's salary
 * @property {Date} joined User's date of joining
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number,
    joined?: Date,
};