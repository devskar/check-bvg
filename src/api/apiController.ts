import express from 'express';

export const getInfo = async (req: express.Request, res: express.Response) => {
	const content = req.body;

	res.json(content).status(200);
};
