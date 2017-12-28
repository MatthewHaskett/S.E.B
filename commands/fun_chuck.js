const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const axios = require('axios');

module.exports.run = async (bot, message, args) => {

    // Chuck command, the command that returns the oh so famous chuck norris jokes.
    
    // Again we use the axios tool. We get the api link, and accept the json file we get returned
    axios.get('http://api.icndb.com/jokes/random', { headers: { Accept: 'application/json' } }).then(response => {
        
        // After that we are almost done again, we just have to create the embed
        const embed = new Discord.RichEmbed()
            .setTitle("Chuck Norris")
            .setColor(green)
            // Unlike the cat api, we have a nested value. So we have to get the data of the response. From that we get the value, after which we can get the joke
            .setDescription(response.data.value.joke);
        // That's all it takes to send chuck norris jokes!
        message.channel.send(embed);
    });
    return;

};

module.exports.help = {
    name: "chuck",
    type: "fun",
    description: "Random Chuck Norris joke",
    usage: `${prefix}chuck`
};