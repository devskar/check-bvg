import express from 'express';
import { getInfo } from './apiController';

const bvgRouter = express.Router();

bvgRouter.get('/', getInfo);

export default bvgRouter;
