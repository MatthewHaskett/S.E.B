const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const axios = require('axios');

module.exports.run = async (bot, message, args) => {

    // Oef, cats! Who doesn't like them
    // Cat command, returning a random cat image from the interwebs. Using a cat api.
    
    // First we just react with a nice looking cat emoji
    message.react("🐱");
    
    // After that we have to get the cat image from the internet, I used a tool called axios for this. 
    // First we get the randomcat api site
    axios.get('https://random.cat/meow').then(response => {
        
        // After that it's almost done already, pretty easy, right?
        const embed = new Discord.RichEmbed()
            .setTitle("Cat")
            .setColor(green)
        
            // We now just have to set the image to the image url, which we do by getting the data of the response, and then getting the file.
            // I recommend taking a look on the site of the api to see what the api actually returns
            .setImage(response.data.file)
            .setFooter(`Requested by ${message.author.username}`);
        // For the final step, and the hardest, we just send the embed. Cats for EVERYONE!
        message.channel.send(embed);
    });
    return;

};

module.exports.help = {
    name: "cat",
    type: "fun",
    description: "Show a random image of a cat",
    usage: `${prefix}cat`
};