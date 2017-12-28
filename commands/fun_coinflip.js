const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

// Invalid Usage function... I just didn't want to create the same embed over and over again, this was an easy way to solve it.
function invalidUsage(message) {
    const embed = new Discord.RichEmbed()
        .setTitle("Invalid Usage")
        .setColor(red)
        .setDescription(`${prefix}coinflip [head, tail]`);
    message.channel.send(embed);
    return;
}

module.exports.run = async (bot, message, args) => {

    // COINFLIP! The most straight forward game imaginable!
    
    // This constant holds our options. "h" from head, and "t" from tail.
    const options = ["h", "t"];

    // Here we check if the args length is not 0, and not 1. This means theres 2 or more args.
    if (!(args.length === 0 || args.length === 1)) {
        // If it's true, we can just call the invalid usage function, and return a nice error message
        invalidUsage(message);
        return;
    }

    // Time to flip the coin, generating a number between 0 and 1 (since theres only 2 options in coinflip)
    let coin = Math.floor(Math.random() * 2);
    // Here we change the number into a word with a switch statement, which will make it more realistic
    switch(coin) {
        case 0:
            coin = "head";
            break;
        case 1:
            coin = "tail";
            break;
    }

    // If the args length is 0, we just want to flip a coin and tell them what it landed on. Not much more is needed
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Coinflip")
            .setColor("#ffffff")
            .setDescription(`Flipped a coin and it landed on: **${coin}**`);
        message.channel.send(embed);
        return;
    }

    // If the options (variable at the top) does not include the first char that the entered (in case "head" it would be "h") we return the invalid usage message
    if (!options.includes(args[0].charAt(0).toLowerCase())) {
        invalidUsage(message);
        return;
    }

    // The users choice is the first char, that typos don't matter as much, only the first letter is important
    let c = args[0].charAt(0).toLowerCase();
    // We switch the first char around, if it's "h" we change it to "head", if it's "t" we change it to "tail"
    switch(c) {
        case "h":
            c = "head";
            break;
        case "t":
            c = "tail";
            break;
    }

    // Time to show if they had made the right choice, if the coin landed on the same as the user entered, we set color to green, otherwise we set it to red
    let color;
    (c === coin) ? color = green : color = red;

    // Then we can just create our embed and say which side it landed on. If the user chose the right side, it will be green. If not, it will be red
    const embed = new Discord.RichEmbed()
        .setTitle("Coinflip")
        .setColor(color)
        .setDescription(`Flipped a coin and it landed on: **${coin}**`);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "coinflip",
    type: "fun",
    description: "Flip a coin",
    usage: `${prefix}coinflip [head, tail]`
};