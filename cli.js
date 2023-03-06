#!/usr/bin/env node
import minimist from "minimist";
import moment from "moment-timezone";


//Using getopts to parse

const args = minimist(process.argv.slice(2));

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
    if (args.n < 0) {
        args.n *= -1;
    }
    args.n = args.n.toFixed(2);
    url = url + "latitude=" + args.n;
} 
if(args.s) {
    console.log(args.s);
    if (args.s > 0) {
        args.s *= -1;
    }
    console.log(args.s);
    args.s = args.s.toFixed(2);
    url = url + "latitude=" + args.s;
} 
if (args.e) {
    if (args.e < 0) {
        args.e *= -1;
    }
    args.e = args.e.toFixed(2);
    url = url + "&longitude=" + args.e;
}
if (args.w) {
    if (args.w > 0) {
        args.w *= -1;
    }
    args.w = args.w.toFixed(2);
    url = url + "&longitude=" + args.w;
    

}
if (args.z) {
    timezone = args.z;
   
} 

url = url + "&timezone=" + timezone;
url = url + "&daily=precipitation_hours";

console.log(url);

const response = await fetch(url);

const data = await response.json();

if (data.error) {
    console.log(data.reason);
    process.exit(0);
}

if (args.j) {
    console.log(data);
    process.exit(0);
}


if (data.daily.precipitation_hours[args.d] > 0) {
    output += "You might need your galoshes ";
} else {
        output += "You will not need your galoshes "
}

if (args.d == 0) {
    output += "today."
  } else if (args.d > 1) {
    output += "in " + args.d + " days."
  } else {
    output += "tomorrow."
  }




console.log(output);














