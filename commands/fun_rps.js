const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Rock, Paper, Scissors. The old school game you played in the car when you were a child.
    
    // There are the options available, "r" for ... rock, etc.
    const options = ["r", "p", "s"];

    // If the args length is 1, or the arg doesn't include the option, we return an error
    if (!(args.length === 1) || !(options.includes(args[0].charAt(0).toLowerCase()))) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}rps [rock, paper, scissors]`);
        message.channel.send(embed);
        return;
    }

    // Here we get the choices. "c" will be the users choice, "botC" the bot choice
    // "c" is the first char of the arg
    let c = args[0].charAt(0).toLowerCase();
    // "botC" is a number between 0 and 2, to simulate one of 3 choices
    let botC = Math.floor(Math.random() * 3);

    // Here we switch the users choice, and change it to the proper word
    switch (c) {
        case "r":
            c = "rock";
            break;
        case "p":
            c = "paper";
            break;
        case "s":
            c = "scissors";
            break;
    }

    // We also do that for the bots choice, changing the number into the words
    switch (botC) {
        case 0:
            botC = "rock";
            break;
        case 1:
            botC = "paper";
            break;
        case 2:
            botC = "scissors";
            break;
    }

    // Here we check if the choices is the same, this will mean it's a tie
    if (c === botC) {
        const embed = new Discord.RichEmbed()
            .setTitle("It's a tie!")
            .setColor(orange)
            .setDescription(`You chose ${c} and I chose ${botC}!`);
        message.channel.send(embed);
        return;
    }

    // Now it's time to check if the user lost.
    // We just check every possible win combination for the bot
    if ((c === "rock" && botC === "paper") || (c === "paper" && botC === "scissors") || (c === "scissors" && botC === "rock")) {
        const embed = new Discord.RichEmbed()
            .setTitle("You lost!")
            .setColor(red)
            .setDescription(`You chose ${c} and I chose ${botC}`);
        message.channel.send(embed);
        return;
    }

    // And finally if the user didn't tie, and didn't lose... He won! Time to send back a nice looking embed that shows he won the match!
    const embed = new Discord.RichEmbed()
        .setTitle("You won!")
        .setColor(green)
        .setDescription(`You chose ${c} and I chose ${botC}!`);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "rps",
    type: "fun",
    description: "Play a game of rock, paper, scissors against a bot",
    usage: `${prefix}rps [rock, paper, scissors]`
};