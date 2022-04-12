import { Command, Option } from 'commander';
import fs from 'fs';
import { resolve } from 'path';
import packageJson from '../package.json';

type Configuration = {
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
	arrivalTime: '8am',
	resultAmount: 3,
};

export const readConfigFile = (path: string): object => {
	const fullPath = resolve(path);

	try {
		const rawdata = fs.readFileSync(fullPath);

		// check for content in file
		if (rawdata.length < 1) {
			console.log(
				'Config file at ' + fullPath + ' seems to be empty. Skipping...',
			);

			return {};
		}
		// parsing json file to js object
		return JSON.parse(rawdata.toString());
	} catch (err) {
		console.log(`Could not load config at "${fullPath}". Skipping...`);
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
		console.log('Not all config items are set');
		console.log('Using default config to fill');

		values = { ...defaultConfiguration, ...values };
	}
	return values as Configuration;
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
