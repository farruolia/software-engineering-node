/**
 * @file Declares API for Tuits related data access object methods
 */
import Tuit from "../../models/tuits/Tuit";

export default interface TuitDaoI {

    /**
     * Uses TuitModel to retrieve all tuits
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuits (): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve all tuits by a user
     * @param {string} uid User id whose tuits have to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuitsByUser (uid: string): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve a tuit by id
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the tuit is retrieved from the database
     */
    findTuitById (tid: string): Promise<Tuit>;

    /**
     * Inserts tuit instance into the database
     * @param {string} uid User who creates tuit
     * @param {Tuit} tuit Tuit to be created
     * @returns Promise To be notified when the tuit is inserted into the database
     */
    createTuitByUser (uid: string, tuit: Tuit): Promise<Tuit>;

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of user who is updating tuit
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit (tid: string, tuit: Tuit): Promise<any>;

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit (tid: string): Promise<any>;
};