import createClient, {
	Alternative,
	HafasClient,
	Journeys,
	Line,
	Location,
	Station,
	Stop,
} from 'hafas-client';
import bvgProfile from 'hafas-client/p/bvg';

class BVGClient {
	client: HafasClient;

	constructor(userAgent: string) {
		this.client = createClient(bvgProfile, userAgent);
	}

	getLocationId = async (name: string): Promise<string | undefined> => {
		return this.client.locations(name, { results: 1 }).then(res => res[0].id);
	};

	getLocation = async (
		name: string,
	): Promise<Readonly<Station | Stop | Location>> => {
		return this.client.locations(name, { results: 1 }).then(res => res[0]);
	};

	getDepartures = async (
		station: Station | Stop | Location,
	): Promise<readonly Alternative[]> => {
		return this.client.departures(station, {
			direction: await this.getLocationId('Hackescher Markt'),
		});
	};

	getDeparturesByDirectionId = async (
		station: Station | Stop | Location,
		directionId: string,
	): Promise<readonly Alternative[]> => {
		return this.client.departures(station, {
			direction: directionId,
		});
	};

	getDeparturesByDirectionName = async (
		station: Station | Stop | Location,
		directionName: string,
	): Promise<readonly Alternative[] | undefined> => {
		const locationId: string | undefined = await this.getLocationId(
			directionName,
		);

		if (locationId !== undefined) {
			return this.getDeparturesByDirectionId(station, locationId);
		}
		return undefined;
	};

	getLineByName = async (name: string): Promise<Line | undefined> => {
		if (this.client.lines)
			return this.client.lines(name, {}).then(res => res[0]);

		return undefined;
	};

	getJourney = async (
		from: string | Station | Stop | Location,
		to: string | Station | Stop | Location,
	): Promise<Journeys> => {
		return this.client.journeys(from, to, {
			arrival: new Date(new Date().setHours(new Date().getHours() + 2)),
		});
	};
}

export default BVGClient;
