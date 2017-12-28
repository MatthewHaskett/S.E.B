const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const inviteLink = config.permanentInviteLink;

module.exports.run = async (bot, message, args) => {

    // Invite command, very very VERY basic!
    
    // Just an embed with a link inside of it. Not much more to it
    const embed = new Discord.RichEmbed()
        .setTitle("Discord Invite Link")
        .setColor(green)
        .setDescription(inviteLink);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "invite",
    type: "general",
    description: "Gives an invite link to the main discord",
    usage: `${prefix}invite`
};