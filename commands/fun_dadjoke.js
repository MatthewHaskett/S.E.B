const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const axios = require('axios');

module.exports.run = async (bot, message, args) => {

    // Those annoying dadjokes!
    // Dadjoke command, random dadjoke from the internet, using a nice API
    
    // Again, using the axios tool, we get the site and accept the json file
    axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(response => {
        
        // After that we are almost done again, quite easy...
        const embed = new Discord.RichEmbed()
            .setTitle("Dad Joke")
            .setColor(green)
            // We can just get the joke executing the following code
            .setDescription(response.data.joke);
        message.channel.send(embed);
        // Voila, dadjoke for you
    });
    return;
};

module.exports.help = {
    name: "dadjoke",
    type: "fun",
    description: "Random dad joke",
    usage: `${prefix}dadjoke`
};