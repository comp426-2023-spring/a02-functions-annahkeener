#!/usr/bin/env node
import minimist from "minimist"
//import { exit } from "yargs";

//Using getopts to parse
const args = minimist(process.argv.slice(2));

console.log(args);

var OPT_N=false;
var OPT_S=false;
var OPT_E=false;
var OPT_W=false;

const timezone = moment.tz.guess();

if (args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("   -h            Show this help message and exit.")
    console.log("   -n, -s        Latitude: N positive; S negative.")
    console.log("   -e, -w        Longitude: E positive; W negative.")
    console.log("   -z            Time zone: uses tz.guess() from moment-timezone by default.")
    console.log("   -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
    console.log("   -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);
} 

var url = "";



//const response = await fetch(url);










