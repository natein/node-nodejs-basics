/*
env.js - implement function that parses environment variables 
with prefix RSS_ and prints them to the console in the format 
RSS_name1=value1; RSS_name2=value2
*/

const rssPrefix = 'RSS_';

const parseEnv = () => {
    const env = process.env;
    const items = [];
    for (let key in env) {
        if (key.substring(0, rssPrefix.length) === rssPrefix)
            items.push(`${ key }=${ env[key] }`);
    }
    console.log(items.join('; '));
};

parseEnv();