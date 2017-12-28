const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const axios = require('axios');

module.exports.run = async (bot, message, args) => {

    // GIFs, who hasn't seen them before?
    // Gif command, return a random gif from giphy.com, using their API
    
    //                                  IMPORTANT!
    // Because I had to get an API key, this will not function untill you get your own API key!
    // You can get your own at https://developers.giphy.com/ by clicking on "Create An App"
    // After that you can just replace ">API_KEY<" in the URL below with your api key
    
    // Again using axios, we get the api site, accept the json file
    axios.get('http://api.giphy.com/v1/gifs/random?api_key=>API_KEY<', { headers: { Accept: 'application/json' } }).then(response => {
        
        // Setting the image to the image url
        const embed = new Discord.RichEmbed()
            .setTitle("Gif")
            .setColor(green)
            .setImage(response.data.data.image_original_url)
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(embed);
        // You can also use giphys search api to make your own commands
    });
    return;

};

module.exports.help = {
    name: "gif",
    type: "fun",
    description: "Show a random gif from giphy",
    usage: `${prefix}gif`
};