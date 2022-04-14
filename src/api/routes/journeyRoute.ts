import express from 'express';
import { getJourney } from '../controller/journeyController';

const journeyRouter = express.Router();

journeyRouter.post('/', getJourney);
export default journeyRouter;
