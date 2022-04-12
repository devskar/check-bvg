import { createCLICommand, validateArgv } from './configuration';

const main = async () => {
	const command = createCLICommand();
	validateArgv(command);
};

const getJournes = async () => {
	// const client: BVGClient = new BVGClient('bvg-checker');
	// const start = await client.getLocation('Prerower Platz');
	// const end = await client.getLocation('Simon-Bolivar Straße');
	// const journeys = await client.getJourney(start, end);
};

main();
