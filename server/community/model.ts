import FreetCollection from '../freet/collection';
import { Freet } from '../freet/model';
import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from '../user/model';

export type Community = {
    _id: Types.ObjectId;
    name: string;
    ownerId: Types.ObjectId;
}

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const CommunityModel = model<Community>('Community', CommunitySchema);
export default CommunityModel;