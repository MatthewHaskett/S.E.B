const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Scrambled eggs command! oh wait, that's not what this is :c
    // Scramble command, scramble your sentences to create some weird stuff
    
    // First we need to check if theres more than 2 args, otherwise it isn't really scrambling, is it?
    if (args.length < 2) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}scramble <message>`);
        message.channel.send(embed);
        return;
    }
    
    // Here we scramble the args using the scramble function at the bottom of the code
    let scrambled = scramble(args);
    
    // After that we can send the embed with the scrambled string, the string is set to lowercase to make it look good, and not have a random capitalized letter somewhere. You could also use a capitalizeFirstLetter function to make it look even better!
    const embed = new Discord.RichEmbed()
        .setTitle("Scramble")
        .setColor(green)
        .setDescription(scrambled.toLowerCase());
    message.channel.send(embed);
    return;
};

// Just doing some scrambling, not going to explain it to much, but it's just reordering the args, and returning it as a single string
const scramble = words => words.sort(() => Math.random() > 0.5).join(" ");

module.exports.help = {
    name: "scramble",
    type: "fun",
    description: "Scrambles up the sentence provided",
    usage: `${prefix}scramble <sentence>`
};