const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

// Do I need to explain?
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports.run = async (bot, message, args) => {

    // FACEBOOK! no? Alright.
    
    // Userinfo command, kinda like facebook? but not at all, just some info
    
    // First we check if the args length is 0, we obviously need someone to see info about
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}userinfo <name, mention, id>`);
        message.channel.send(embed);
        return;
    }

    // Then we join the args together for the username
    let username = args.join(" ");

    // Then we get the member, we get the member either by the first mention, the id, or we try to find the user by it's username
    let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find('displayName', username);

    // If all of them are undefined (there was no member found) we return this error message
    if (!member) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error!")
            .setColor(red)
            .setDescription("Could not find this user! Is the user in this guild?");
        message.channel.send(embed);
        return;
    }

    // Then we get the highest role of the member, and it's color
    let color = member.highestRole.color;
    // Then we get the default role of the guild (@everyone)
    let everyoneRole = message.guild.defaultRole;
    // Then we compare the color of the users highest role with the default roles color. If they are the same (a boring gray) we set the color to bright white
    if (color === everyoneRole.color) {
        color = "#FFFFFF";
    }

    // Then we get the nickname of the member
    let nickName = member.nickname;
    // If the member doesn't have one (it's undefined), we just set it to the members username
    if (!nickName) {
        nickName = member.user.username;
    }

    // Here we get the time of creation of the user and set it to a datestring so we can change order again
    let createdAtRaw = member.user.createdAt.toDateString();
    // We also split it to be able to rearrange the order
    let createdAt = createdAtRaw.split(" ");

    // Same story again, but now for when the user joined the current guild
    let joinedAtRaw = member.joinedAt.toDateString();
    let joinedAt = joinedAtRaw.split(" ");

    // Then we get the game of the user
    let playingStatus = member.presence.game;
    // if there is a game, we set the variable to the name of the game. If they have a status like: "Playing Online Games", it would turn into "Online Games"
    if (playingStatus) {
        playingStatus = member.presence.game.name;
    } else {
        // If there isn't a game, we set it to N/A to prevent undefined from showing up
        playingStatus = "N/A"
    }

    // Then we can just create the embed. A lot of information could just be added in here without having anything to be done before
    const embed = new Discord.RichEmbed()
        .setAuthor("Userinfo")
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`This is the userinfo of **${nickName}**`)
        .addField("Full Username", member.user.tag, true)
        .addField("ID", member.id, true)
        .addField("Bot Account", capitalizeFirstLetter(member.user.bot.toString()), true)
        .addField("Verified", capitalizeFirstLetter(member.client.user.verified.toString()), true)
        .addField("Presence", capitalizeFirstLetter(member.presence.status), true)
        .addField("Playing Status", playingStatus, true)
        .addField("Account Created On", `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
        .addField("Joined This Guild On", `${joinedAt[0]} ${joinedAt[2]} ${joinedAt[1]} ${joinedAt[3]}`, true)
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "userinfo",
    type: "general",
    description: "Show info about a specific user",
    usage: `${prefix}userinfo <username, mention, id>`
};