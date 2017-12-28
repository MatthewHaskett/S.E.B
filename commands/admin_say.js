const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Say command, which haves the bot repeat what the user says, either in the same channel, or in a channel specified
    
    // First we got to check if the user isn't evil
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("You do not have the permission: `MANAGE_MESSAGES`");
        message.channel.send(embed);
        message.react("❌");
        return;
    }
    
    // If there are no args, there is nothing to repeat, that's why we need to cancel it again
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}say <message>`);
        message.channel.send(embed);
        return;
    }

    // Here we check if the first arg is a channel, we make use of some nice regex again for that. We also check if the args length isn't 1, because if we want to send a message to a specific channel we need the channel (1), and a message to repeat (2 - infinity)
    if (/<(@!?|#)\d+>/.test(args[0]) && args.length !== 1) {
        
        let id, channel, msg;
        
        // Mentioning a channel looks something like this <#1252109210927> when it's RAW. To get the ID of the channel we can simply remove the "<#" and the ">" at the end, leaving us with the channel ID
        id = args[0].replace("<#", "").replace(">", "");
        // Then we just find the channel in the guild the message was send in
        channel = message.guild.channels.find("id", id);
        
        // If there wasn't a channel, we return a message saying the channel wasn't found
        if (!channel) {
            const embed = new Discord.RichEmbed()
                .setTitle("Error")
                .setColor(red)
                .setDescription("Couldn't find this channel!");
            message.channel.send(embed);
            message.react("❌");
            return;
        }
        
        // To create the message we remove the first arg (the channel mention) and join the args together
        msg = args.slice(1);
        msg = msg.join(" ");
        
        // Then we just send the message to the specified channel, and add a nice checkmark reaction to the users message so he knows everything was successful
        channel.send(msg);
        message.react("✅");
        return;
    }
    
    // If we got to this part of the code we will just repeat the message in the current channel, so all we have to do is join the message and send it
    let msg = args.join(" ");
    // We also delete the message (really sneaky) so it looks more like the bot is talking himself
    message.delete();
    message.channel.send(msg);
    
    return;
};

module.exports.help = {
    name: "say",
    type: "admin",
    description: "Repeat whatever is said in the arguments",
    usage: `${prefix}say [channel] <message>`
};