import express from 'express';
import { Configuration, fillupWithDefaultConfig } from '../../configuration';
import { helper as bvgHelper } from '../../index';

export const getJourney = async (
	req: express.Request,
	res: express.Response,
) => {
	const content = req.body;
	const filledConfig: Configuration = fillupWithDefaultConfig(content);
	res.json(await bvgHelper.getJourneyFromConfig(filledConfig)).status(200);
};
