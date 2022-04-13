import express from 'express';
import bvgRouter from './apiRouter';
import { DEFAULT_ENDPOINT } from './const';

export const start = (port: number) => {
	const app = express();

	app.use(express.json());

	app.use(DEFAULT_ENDPOINT, bvgRouter);

	app.listen(port, () => console.log('Listening on port ', port));
};
