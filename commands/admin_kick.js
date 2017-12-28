const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Kick command, to, as you might have guessed, kick a user from our guild
    
    // First of all we want to check if the author has kick permissions, that way we are sure that we don't allow bad people to kick others
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("You do not have the permission: `KICK_MEMBERS`");
        message.channel.send(embed);
        message.react("❌");
        return;
    }
    
    // Here we check if the args length is 0, which means the user didn't include an user he wants to kick
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}kick <mention, id> [reason]`);
        message.channel.send(embed);
        return;
    }
    
    // Time to get the member from the message. First we get the first mention, if it's undefined, we get the member from the args (with the id)
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    // If both are undefined (there was no user mentioned, no id included, or the member wasn't found), we send a nice message saying we couldn't find the user
    if (!member) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("Could not find this user! Is the user in this guild?");
        message.channel.send(embed);
        return;
    }
    
    // Time to check if the user is trying to be bad. If the users highest role is lower as the highest role of the person hes trying to kick, we send him a message he can't ban that specific user
    if (member.highestRole.position > message.member.highestRole.position) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("You can not ban this user! His/her role is higher than yours!");
        message.channel.send(embed);
        message.react("❌");
        return;
    }
    
    // Here we get the reason for the command, which is the args without the user (first arg)
    let reason, tag;
    reason = args.slice(1);
    reason = reason.join(" ");
    // If there is no reason, we set it to "N/A" to make it look nice and clean
    if (!reason) {
        reason = "N/A";
    }
    
    // Before we kick the user we want to get their tag, so we can display that in the embed
    tag = member.user.tag;
    
    // Time to kick the user, including the reason for the kick
    member.kick(reason);
    // At last we send a nice message including the person who kicked the user, the tag of the user (username and disciminator) and the reason
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(green)
        .setDescription(`Kicked ${tag} from the guild!`)
        .addField("Reason", reason);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "kick",
    type: "admin",
    description: "Kick an user from the guild",
    usage: `${prefix}kick <mention, id> [reason]`
};