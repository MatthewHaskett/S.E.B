const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const cheerio = require('cheerio');
const request = require('request');
const url = "http://explosm.net/rcg";

module.exports.run = async (bot, message, args) => {
    
    // COMICS! Who doesn't like comics?
    // Comic command, this command returns a random command "provided" by explosm.net/rcg
    // It was quite hard to make this, since they didn't have an API for this. I had to scrape the website to get the right file from it and embed it
    
    // I used a tool called cheerio to scrape the website
    // First we need to request the site
    request(url, (err, resp, body) => {
        // After that we can set $ equal to the body of the site
        const $ = cheerio.load(body);
        
        // In order to get the file, we had to get the permLink, which is the same as the files url
        // To do that we search for an input with the type text
        let permLink = $('input[type="text"]').val();
        
        // This will return something like this: http://explosm.net/rcg/pivaqyekm
        // But what we need for the file url is this: http://files.explosm.net/rcg/pivaqyekm.png
        
        // To do that we replace "explosm.net" with "files.explosm.net", this will leave us with just the .png left to do
        let image = permLink.replace("explosm.net", "files.explosm.net");
        
        // Now that the image variable is set the the proper image url, we can send it
        // We just create the embed and set the image to the image url + .png
        const embed = new Discord.RichEmbed()
            .setTitle("Comic")
            .setColor(green)
            .setImage(`${image}.png`)
            .setFooter(`Requested by ${message.author.username}`);
        // Time to send our new awesome random comic :D
        message.channel.send(embed);
    });
    
    return;
};

module.exports.help = {
    name: "comic",
    type: "fun",
    description: "Show a random comic from http://explosm.net/rcg",
    usage: `${prefix}comic`
};