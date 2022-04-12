# check bvg

## Explanation

Simple command line tool that give u an x amount of departures from a train station to a another one, to arrive at a certain time.

It works completely config based, but all parameters should also be able to be passed via command line. Command Line arguments will always override config arguments.

## Config

```json
{
	"start": "S+U Alexanderplatz",
	"end": "S Hackescher Markt",
	"arrivalTime": "8am",
	"resultAmount": 3
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
	<li>-h, --help display help for command</li>
</ul>

## Use Case

I am using this script personally to get the 3 latest trains I have to catch every morning. The results will later be used by another service.
