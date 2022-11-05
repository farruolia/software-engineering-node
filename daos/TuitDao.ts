/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/tuits/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec()
            .catch(error => error);


    /**
     * Uses TuitModel to retrieve all tuits by a user
     * @param {string} uid User id whose tuits have to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec()
            .catch(error => error);

    /**
     * Uses TuitModel to retrieve a tuit by id
     * @param {string} tid Tuit id
     * @returns Promise To be notified when the tuit is retrieved from the database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec()
            .catch(error => error);

    /**
     * Inserts tuit instance into the database
     * @param {string} uid User who creates tuit
     * @param {Tuit} tuit Tuit to be created
     * @returns Promise To be notified when the tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel
            .create({...tuit, postedBy: uid})
            .catch(error => error);

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tid who to be updated
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel
            .updateOne(
            {_id: tid},
            {$set: tuit})
            .catch(error => error);

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel
            .deleteOne({_id: tid})
            .catch(error => error);

    /**
     * Removes all tuits from the database.
     * @returns Promise To be notified when tuits are removed from the database
     */
    deleteAllTuits = async (): Promise<any> =>
        TuitModel
            .deleteMany()
            .catch(error => error);
}