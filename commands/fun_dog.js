const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const axios = require('axios');

module.exports.run = async (bot, message, args) => {

    // DOGGIE!
    // Dog command, don't like cats? Well, I've got you covered. Using a dog API, we will be returning random dog images
    
    // First we just react with a nice dog emoji :>
    message.react("🐶");
    
    // Again... using the axios tool we get the api, and accept the json file
    axios.get('https://dog.ceo/api/breeds/image/random', { headers: { Accept: 'application/json' } }).then(response => {
        
        // This is getting easy now isn't it?
        // Just got to set the image of the embed to the dog image url
        const embed = new Discord.RichEmbed()
            .setTitle("Dog")
            .setColor(green)
            .setImage(response.data.message)
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(embed);
        // Dog images for all!
    });
    return;

};

module.exports.help = {
    name: "dog",
    type: "fun",
    description: "Show a random image of a dog",
    usage: `${prefix}dog`
};