import { Command, Option } from 'commander';
import packageJson from '../package.json';

const defaultConfiguration = {
	start: 'S+U Alexanderplatz',
	end: 'S Hackescher Markt',
	arrivalTime: '8am',
	resultAmount: 3,
};

export const valdiateConfigFile = (path: string) => {
	throw new Error('not implemented');
};

export const validateArgv = (command: Command) => {
	command.parse(process.argv);
	console.log(command.opts());
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
			),
		);
};
