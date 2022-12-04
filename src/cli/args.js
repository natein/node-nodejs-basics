/*
args.js - implement function that parses command line arguments 
(given in format --propName value --prop2Name value2, you don't 
need to validate it) and prints them to the console in the format 
propName is value, prop2Name is value2
*/

const parseArgs = () => {
    const args = process.argv.slice(2);
    const items = [];
    for(let i = 0; i < args.length; i += 2)
        items.push(`${ args[i].substring(2) } is ${ args[i + 1] }`);

    console.log(items.join(', '));
};

parseArgs();