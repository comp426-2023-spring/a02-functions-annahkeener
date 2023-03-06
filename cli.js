#!/usr/bin/env node
import minimist from "minimist";
import moment from "moment-timezone";

//Using getopts to parse
var north = 0;
var south = 0;
var east = 0;
var west = 0;
var day = 1;

const args = minimist(process.argv.slice(2));


console.log(args);

var timezone = moment.tz.guess();

var output = "";

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

var url = "https://api.open-meteo.com/v1/forecast?";

if (args.n) {
    north = Math.round(args.n);
    url = url + "latitude=" + north;
} 
if(args.s) {
    south = Math.round(args).s;
    url = url + "latitude=" + south;
} 
if (args.e) {
    east = Math.round(args).e;
    url = url + "&longitude=" + east;
}
if (args.w) {
    west = Math.round(args).w
    url = url + "&longitude=" + west;

}
if (args.z) {
    timezone = args.z;
   
} 

console.log("TIMEZONE!: " + timezone);
url = url + "&timezone=" + timezone;
url = url + "&daily=precipitation_hours";
console.log(url);

const response = await fetch(url);
const data = await response.json();
console.log(data);

if (data.daily.precipitation_hours[args.d] > 0) {
    output += "You might need your galoshes ";
} else {
        output += "You will not need your galoshes "
}

console.log("day: " + args.d);
if (args.d == 0) {
    output += "today."
  } else if (args.d > 1) {
    output += "in " + args.d + " days."
  } else {
    output += "tomorrow."
  }


if (args.j) {
    console.log(response);
    process.exit(0);
}

console.log(output);














