const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;
const ownerID = config.ownerID;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Setgame command, to set the playing status of the bot to something else, will reset on restart
    
    // Got to check if the authors ID is the same as the owners ID (the owner ran the command)
    if (!(message.author.id === ownerID)) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("Only the bot owner can use the `setgame` command!");
        message.channel.send(embed);
        message.react("❌");
        return;
    }

    // If the args length is 0, we cancel out because there was nothing provided to set the game to
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}setgame <game>`);
        message.channel.send(embed);
        return;
    }

    // Then we join the args together to get the game, after that we update the status
    let game = args.join(" ");
    bot.user.setGame(game);

    // And we send a nice embed for good measure
    const embed = new Discord.RichEmbed()
        .setTitle("Success!")
        .setColor(green)
        .setDescription(`Updated my playing status to **${game}**`);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "setgame",
    type: "admin",
    description: "Set the playing status of the bot",
    usage: `${prefix}setgame <game>`
};