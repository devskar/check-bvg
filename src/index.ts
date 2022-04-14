import packageJson from '../package.json';
import { start } from './api/server';
import BVGClient from './BVGClient';
import BVGHelper from './BVGHelper';
import { Configuration, createCLICommand, validateArgv } from './configuration';

export const client = new BVGClient(packageJson.name);
export const helper = new BVGHelper(client);

const main = async () => {
	const command = createCLICommand();
	const config: Configuration = validateArgv(command);

	config.server ? runServer(config.port) : runServerless(config);
};

const runServer = (port: number) => {
	console.log('Starting server 🚀');
	start(port);
};

const runServerless = (config: Configuration) => {
	console.log('Running serverless 🚀');

	console.log(config);
};

main();
