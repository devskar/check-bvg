import express from 'express';
import packageJson from '../../package.json';
import BVGClient from '../BVGClient';
import BVGHelper from '../BVGHelper';
import { Configuration, fillupWithDefaultConfig } from '../configuration';

const bvgHelper = new BVGHelper(new BVGClient(packageJson.name));

export const getJourney = async (
	req: express.Request,
	res: express.Response,
) => {
	const content = req.body;
	const filledConfig: Configuration = fillupWithDefaultConfig(content);
	res.json(await bvgHelper.getJourneyFromConfig(filledConfig)).status(200);
};
