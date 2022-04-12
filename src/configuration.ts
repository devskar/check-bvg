import { Command, Option } from 'commander';
import fs from 'fs';
import { resolve } from 'path';
import packageJson from '../package.json';

export type Configuration = {
	config: string;
	start: string;
	end: string;
	arrivalTime: string;
	resultAmount: number;
};

const requiredConfigurationKeys = [
	'start',
	'end',
	'arrivalTime',
	'resultAmount',
];

const defaultConfiguration: Configuration = {
	config: 'bvg-check.config.json',
	start: 'S+U Alexanderplatz',
	end: 'S Hackescher Markt',
	arrivalTime: '8:00',
	resultAmount: 3,
};

export const readConfigFile = (path: string): object => {
	const fullPath = resolve(path);

	try {
		const rawdata = fs.readFileSync(fullPath);

		// check for content in file
		if (rawdata.length < 1) {
			console.warn(
				'Config file at ' + fullPath + ' seems to be empty. Skipping...',
			);

			return {};
		}
		// parsing json file to js object
		return JSON.parse(rawdata.toString());
	} catch (err) {
		console.warn(`Could not load config at "${fullPath}". Skipping...`);
		return {};
	}
};

export const validateArgv = (command: Command): Configuration => {
	command.parse(process.argv);
	let values = command.opts();

	values = {
		...readConfigFile(values['config'] ?? defaultConfiguration.config),
		...values,
	};

	// filling up values, with the default configuration in case values is not a complete configuration yet
	if (!isConfiguration(values)) {
		console.warn('Not all config items are set');
		console.warn('Using default config to fill');

		values = { ...defaultConfiguration, ...values };
	}

	const filledConfig: Configuration = values as Configuration;

	// simple check if time is set correctly
	const [hoursStr, minutesStr]: string[] = filledConfig.arrivalTime.split(':');
	const hours = Number.parseInt(hoursStr);
	const minutes = Number.parseInt(minutesStr);

	if (hours > 24 || 0 > hours) {
		console.warn('Arrival hour must be between 0 and 24. Using default value');
		filledConfig.arrivalTime = defaultConfiguration.arrivalTime;
	} else {
		// hours correct

		if (isNaN(minutes) || minutes > 60 || 0 > minutes) {
			// hours correct, numbers incorrect

			console.warn(
				'Arrival minutes must be between 0 and 60. No minutes will be specified',
			);
			filledConfig.arrivalTime = hours.toString();
		} else {
			// if everything was correct
			filledConfig.arrivalTime = hours + ':' + minutes;
		}
	}

	return filledConfig;
};

export const createCLICommand = (): Command => {
	return new Command(packageJson.name)
		.version(packageJson.version)
		.usage('[options]')
		.addOption(new Option('-C, --config <config-path>', 'Path to config'))
		.addOption(
			new Option(
				'-S, --start <start-station>',
				'Name of the station where the journey starts',
			),
		)
		.addOption(
			new Option(
				'-E, --end <end-station>',
				'Name of the station where the journey ends',
			),
		)
		.addOption(
			new Option(
				'-A, --arrivalTime <time>',
				'Time where you want to arrive at the end station',
			),
		)
		.addOption(
			new Option(
				'-R, --resultAmount <amount>',
				'Amount of results the script should return',
			).argParser(value => Number.parseInt(value)),
		);
};

const isConfiguration = (obj: object): obj is Configuration => {
	return requiredConfigurationKeys.every(key =>
		Object.prototype.hasOwnProperty.call(obj, key),
	);
};
