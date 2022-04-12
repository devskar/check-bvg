import { Command, Option } from 'commander';
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

export const readConfigFile = (path: string): Configuration => {
	throw new Error('not implemented');
};

export const validateArgv = (command: Command) => {
	command.parse(process.argv);
	let values = command.opts();
	console.log(values);
	if (values['config']) {
		values = { ...readConfigFile(values['config']), ...values };
	}

	if (!isConfiguration(values)) {
		console.log('Not all config items are set...');
		console.log('Using default config to fill');

		values = { ...defaultConfiguration, ...values };
	}

	console.log(values);
};

export const createCLICommand = (): Command => {
	return new Command(packageJson.name)
		.version(packageJson.version)
		.usage('check-bvg [options]')
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
