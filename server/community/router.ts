import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import CommunityCollection from './collection';
import * as userValidator from '../user/middleware';
import * as communityValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a community.
 *
 * @name POST /api/communities
 *
 * @param {string} name - the name of the community
 * @return {CommunityResponse} - The created community
 * @throws {409} - If the community name is already taken
 *
 */
 router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityNameNotTaken
    ],
    async (req: Request, res: Response) => {
        const userId = (req.session.userId as string);
        const community = await CommunityCollection.addOne(req.body.name, userId);
        res.status(201).json({
            message: `Your community ${community.name} has been successfully created`,
            community: util.constructCommunityResponse(community)
        });
    }
);

/**
 * Delete a community
 *
 * @name DELETE /api/communities/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {403} - If the user is not the owner of the community
 * @throws {404} - If the communityId is not valid
 */
router.delete(
    '/:communityId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isCurrentUserCommunityOwner
    ],
    async (req: Request, res: Response) => {
        await CommunityCollection.deleteOne(req.params.communityId);
        res.status(200).json({
        message: 'Your community has been deleted successfully.'
        });
    }
);

export {router as communityRouter};
