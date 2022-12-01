import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as communityValidator from '../community/middleware';
import * as util from './util';
import UserCollection from '../user/collection';

const router = express.Router();


/**
 * Create a new follow.
 *
 * @name POST /api/follows?followedUser=user
 *
 * @return {FollowResponse} - The created follow
 * @throws {403} - If the user is not logged in
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        console.log(req.query)
        console.log(req.params)
        const followedUser = await UserCollection.findOneByUsername(req.query.followedUser as string);
        const followedUserId = followedUser.id.toString()
        const userId = req.session.userId as string
        const follow = await FollowCollection.addOne(userId, followedUserId);
      
        res.status(201).json({
            message: `You followed ${followedUser.username}`,
            freet: util.constructFollowResponse(follow)
        });
    }
);

/**
 * Delete a follow
 *
 * @name DELETE /api/freets?followedUser=user
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in 
 */
 router.delete(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const userId = req.session.userId as string
        const followedUser = await UserCollection.findOneByUsername(req.query.followedUser as string);
        const followedUserId = followedUser.id.toString()
        await FollowCollection.deleteOne(userId, followedUserId);
        res.status(200).json({
            message: `You unfollowed ${followedUser.username}`,
        });
    }
  );

export {router as followRouter};