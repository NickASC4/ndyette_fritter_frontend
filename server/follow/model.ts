import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';


export type Follow = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    following: User;
    followed: User;
    date: Date;
}

const FollowSchema = new Schema<Follow>({
    // The author userId
    following: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // The content of the freet
    followed: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
      type: Date,
      required: true
    }
  });
  
  const FollowModel = model<Follow>('Follow', FollowSchema);
  export default FollowModel;