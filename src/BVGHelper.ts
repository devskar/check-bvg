import { Journeys } from 'hafas-client';
import BVGClient from './BVGClient';
import { Configuration } from './configuration';
import { numberToDate } from './utils';

class BVGHelper {
	client: BVGClient;

	constructor(client: BVGClient) {
		this.client = client;
	}

	getJourneyFromConfig = async (config: Configuration): Promise<Journeys> => {
		const start = await this.client.getLocation(config.start);
		const end = await this.client.getLocation(config.end);
		const arrival = numberToDate(config.arrivalTime);

		return this.client.getJourney(start, end, arrival);
	};
}

export default BVGHelper;
