import BVGClient from './BVGClient';

const main = async () => {
	const client: BVGClient = new BVGClient('bvg-checker');

	const start = await client.getLocation('Prerower Platz');
	const end = await client.getLocation('Simon-Bolivar Straße');

	const journeys = await client.getJourney(start, end);

	console.log(journeys.journeys![0]);
};

main();
