import type {HydratedDocument, Types} from 'mongoose';
import type {Community} from './model';
import CommunityModel from './model';

class CommunityCollection {
    
    /**
     * Add a new Community
     * 
     * @param {string} name - The name of the community
     * @param {string} ownerId - The id of the owner of the community
     * @return {Promise<HydratedDocument<Community>>} - The newly created community
     */

    static async addOne(name: string, ownerId: Types.ObjectId | string): Promise<HydratedDocument<Community>> {
        const community = new CommunityModel({name, ownerId});
        await community.save();

        return community.populate('ownerId');

    }

    /**
     * Find a community by userId.
     *
     * @param {string} communityId - The communityId of the community to find
     * @return {Promise<HydratedDocument<Community>> | Promise<null>} - The community with the given id, if any
     */
    static async findOneByCommunityId(communityId: Types.ObjectId | string): Promise<HydratedDocument<Community>> {
        return CommunityModel.findOne({_id: communityId});
    }

    /**
     * Find a community by name (case insensitive).
     *
     * @param {string} name - The communityId of the community to find
     * @return {Promise<HydratedDocument<Community>> | Promise<null>} - The community with the given name, if any
     */
    static async findOneByName(name: string): Promise<HydratedDocument<Community>> {
        return CommunityModel.findOne({name: new RegExp(`^${name.trim()}$`, 'i')});
    }

    /**
     * Update community's information
     * 
     * @param communityId 
     * @param communityDetails 
     * @returns 
     */
    static async updateOne(communityId: Types.ObjectId | string, communityDetails:any): Promise<HydratedDocument<Community>> {
        const community = await CommunityModel.findOne({_id: communityId});

        await community.save();
        return community;

    }

    /**
     * Delete a community from the collection.
     *
     * @param {string} communityId - The userId of user to delete
     * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
     */
    static async deleteOne(communityId: Types.ObjectId | string): Promise<boolean> {
        const community = await CommunityModel.deleteOne({_id: communityId});
        return community !== null;
    }
}

export default CommunityCollection