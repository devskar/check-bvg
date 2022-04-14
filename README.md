# check bvg

## Explanation

Simple command line tool that give u an x amount of departures from a train station to a another one, to arrive at a certain time.

It works completely config based, but all parameters should also be able to be passed via command line. Command Line arguments will always override config arguments.

It is basically a simple wrapper of the [hafas-client](https://github.com/public-transport/hafas-client), that introduces a config base cli tool, and has the ability to start a rest server that accepts configs as payload.

## Config

_example/default_

```json
{
	"config": "check-bvg.config.json",
	"start": "S+U Alexanderplatz",
	"end": "S Hackescher Markt",
	"arrivalTime": "8:00",
	"resultAmount": 3,
	"server": false,
	"port": 3000
}
```

## CLI

`check-bvg -c ./check-bvg.config.json --resultAmount 5`

Usage: check-bvg [options]

Options:

<ul>
	<li>-V, --version output the version number</li>
	<li>-C, --config &lt;path> Path to config</li>
	<li>-S, --start &lt;start-station> Name of the station where the journey starts</li>
	<li>-E, --end &lt;end-station> Name of the station where the journey ends</li>
	<li>-A, --arrivalTime &lt;time> Time where you want to arrive at the end station</li>
	<li>-R, --resultAmount &lt;amount> Amount of results the script should return</li>
	<li>--server Sets up a server that responds to rest requests</li>
  <li>-P, --port &lt;port>            Defines the port of the server</li>
	<li>-h, --help display help for command</li>
</ul>

## REST

_journey endpoint_

```http
POST /api/v1/journey
```

Payload is basically a config object.

## Use Case

I am using this script personally to get the 3 latest trains I have to catch every morning. The results will later be used by another service.

## Features

[ ] Parings Dates as AM/PM
