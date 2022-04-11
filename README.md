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

## Use Case

I am using this script personally to get the 3 latest trains I have to catch every morning. The results will later be used by another service.
