import packageJson from '../package.json';
import { start } from './api/server';
import BVGClient from './BVGClient';
import { Configuration, createCLICommand, validateArgv } from './configuration';

const main = async () => {
	const client = new BVGClient(packageJson.name);

	const command = createCLICommand();
	const config: Configuration = validateArgv(command);

	console.log(config);
};

const runServer = (port: number) => {
	console.log('Running server');
	start(port);
};

const runServerless = (config: Configuration) => {
	console.log('Running serverless');
};

main();
