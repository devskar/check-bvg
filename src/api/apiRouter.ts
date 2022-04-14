import express from 'express';
import journeyRoute from './routes/journeyRoute';

const bvgRouter = express.Router();

bvgRouter.use('/journey', journeyRoute);

export default bvgRouter;
