import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as communityValidator from '../community/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the freets
 *
 * @name GET /api/freets
 *
 * @return {FreetResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get freets by author.
 *
 * @name GET /api/freets?author=username
 *
 * @return {FreetResponse[]} - An array of freets created by user with username, author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if author query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }

    const allFreets = await FreetCollection.findAll();
    const response = allFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const authorFreets = await FreetCollection.findAllByUsername(req.query.author as string);
    const response = authorFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  }
);

/**
 * Get freets in a community.
 *
 * @name GET /api/freets/:id
 *
 * @return {FreetResponse[]} - An array of freets in the community user with id, authorId
 * @throws {400} - If community is not given
 * @throws {404} - If the community does not exist
 *
 */
 router.get(
  '/:community?',
  [
    userValidator.isUserLoggedIn,
    communityValidator.isCommunityExists
  ],
  async (req: Request, res: Response) => {
    const authorFreets = await FreetCollection.findAllByCommunity(req.params.community as string);
    const response = authorFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new freet.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @param {boolean} newspost - Whether or not the post is a newspost
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long or 600 for a newspost
 */
 router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isValidFreetContent,
  ],
  async (req: Request, res: Response) => {
    let newspost = false;
    if (req.body.newspost) {
      newspost = true;
    }
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const freet = await FreetCollection.addOne(userId, req.body.content, newspost, '');

    res.status(201).json({
      message: 'Your freet was created successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

/**
 * Create a new freet in a community.
 *
 * @name POST /api/freets/:id
 *
 * @param {string} content - The content of the freet
 * @param {boolean} newspost - Whether or not the post is a newspost
 * @param {string} community - The community the post is being made in
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long or 600 for a newspost
 * @throws {404} - If the community is not valid 
 * @throws {403} - If the user is not a member of the community 
 */
 router.post(
  '/:communityId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isValidFreetContent,
    communityValidator.isCommunityExists,
    communityValidator.isCurrentUserCommunityMember
  ],
  async (req: Request, res: Response) => {
    let newspost = false;
    if (req.body.newspost) {
      newspost = true;
    }
    let community = '';
    if (req.params.communityId) {
      community = req.params.communityId;
    }
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const freet = await FreetCollection.addOne(userId, req.body.content, newspost, community);

    res.status(201).json({
      message: 'Your freet was created successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await FreetCollection.deleteOne(req.params.freetId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PATCH /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.patch(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.updateOne(req.params.freetId, req.body.content);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

export {router as freetRouter};
