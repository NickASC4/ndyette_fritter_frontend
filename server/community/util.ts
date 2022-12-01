import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Community} from './model';

type CommunityResponse = {
    _id: string;
    name: string;
    ownerId: string;
};

 /**
  * Transform a raw community object from the database into an object
  * with all the information needed by the frontend
  * (in this case, removing the password for security)
  *
  * @param {HydratedDocument<Community>} community - A community object
  * @returns {CommunityResponse} - The community object without the password
  */
 const constructCommunityResponse = (community: HydratedDocument<Community>): CommunityResponse => {
   const communityCopy: Community = {
     ...community.toObject({
       versionKey: false // Cosmetics; prevents returning of __v property
     })
   };
   return {
     ...communityCopy,
     _id: communityCopy._id.toString(),
     name: communityCopy.name,
     ownerId: communityCopy.ownerId._id.toString()
   };
 };
 
 export {
   constructCommunityResponse
 };