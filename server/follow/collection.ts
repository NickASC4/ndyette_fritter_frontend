import {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';
import UserCollection from '../user/collection';
import FreetModel from '../freet/model';

class FollowCollection {

    /**
     * Add a follow to the collection
     *
     * @param {string} followingId - The id of the user doing the following
     * @param {string} followedId - The id of the user being followed
     * @return {Promise<HydratedDocument<Follow>>} - The newly created follow
     */
    static async addOne(followingId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        const date = new Date();
        const following = await UserCollection.findOneByUserId(followingId);
        const followed = await UserCollection.findOneByUserId(followedId);
        const follow = new FollowModel({
            following,
            followed,
            date: date
        });
        await follow.save(); // Saves follow to MongoDB
        return follow.populate(['following', 'followed']);
    }

    /**
     * Delete a freet with given freetId.
     *
     * @param {string} followingId - The id of the user doing the following
     * @param {string} followedId - The id of the user being followed
     * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
     */
    static async deleteOne(followingId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<boolean>{
        const freet = await FollowModel.deleteOne({following: followingId, followed: followedId});
        return freet !== null;
    }

    /**
     * Find a follow by followId
     *
     * @param {string} followId - The id of the follow to find
     * @return {Promise<HydratedDocument<Follow>> | Promise<null> } - The follow with the given followId, if any
     */
    static async findOne(followingId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        return FollowModel.findOne({following: followingId, followed: followedId});
    }


    /**
     * Get all the follows in the database
     *
     * @return {Promise<HydratedDocument<Follow>[]>} - An array of all of the follows
     */
    static async findAll(): Promise<Array<HydratedDocument<Follow>>> {
        // Retrieves follows and sorts them from most to least recent
        return FollowModel.find({}).sort({dateModified: -1}).populate('authorId');
    }

    static async findAllFollowing(username: string) {
        const user = await UserCollection.findOneByUsername(username);
        return FreetModel.find({following: user._id}).populate('authorId');
    }

    static async findAllFollowers(username: string) {
        const user = await UserCollection.findOneByUsername(username);
        return FreetModel.find({followed: user._id}).populate('authorId');

    }

}

export default FollowCollection;