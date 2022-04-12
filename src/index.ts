import packageJson from '../package.json';
import BVGClient from './BVGClient';
import { Configuration, createCLICommand, validateArgv } from './configuration';
import { numberToDate } from './utils';
const main = async () => {
	const client = new BVGClient(packageJson.name);

	const command = createCLICommand();
	const config: Configuration = validateArgv(command);
	const start = await client.getLocation(config.start);
	const end = await client.getLocation(config.end);
	const journeys = await client.getJourney(
		start,
		end,
		numberToDate(config.arrivalTime),
	);

	console.log(
		journeys
			.journeys![1].legs.map(leg => (leg.walking ? '🚶‍♂️' : leg.line?.name))
			.join(' -> '),
	);
};

const getJournes = async () => {
	// const client: BVGClient = new BVGClient('bvg-checker');
	// const start = await client.getLocation('Prerower Platz');
	// const end = await client.getLocation('Simon-Bolivar Straße');
	// const journeys = await client.getJourney(start, end);
};

main();
