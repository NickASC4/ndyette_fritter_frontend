import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type { Follow } from './model';

type FollowResponse = {
    _id: string;
    following: string;
    followed: string;
    date: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
 const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw follow object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Follow>} follow - A follow
 * @returns {FollowResponse} - The follow object formatted for the frontend
 */
const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
    const followCopy: Follow = {
        ...follow.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
        })
    };
    return {
        ...followCopy,
        _id: followCopy._id.toString(),
        following: followCopy.following._id.toString(),
        followed: follow.followed._id.toString(),
        date: formatDate(follow.date)
    };
};

export {
    constructFollowResponse
};
  