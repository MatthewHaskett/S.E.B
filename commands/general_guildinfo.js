const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Guildinfo command, show info about the current guild!
    
    // To show info about a guild, we first need to get the guild. We can simply do that by getting the guild from the message
    let guild = message.guild;

    // Then we have to check if the guild is available, just a way for us to prevent possible errors
    if (!guild.available) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("An error occurred, please try again");
        message.channel.send(embed);
        return;
    }
    
    // Now we are going to do some role magic, we want the embed color to be the highest roles' color
    // We will be setting the highestRole variable to the highest role in the guild, but to start we need to have a default role. In this case we can just use the guild.defaultRole, which will get the "@everyone" role every guild has
    let highestRole = message.guild.defaultRole;
    
    // After that we can loop through each of the roles in the guild
    guild.roles.forEach(role => {
        // If the role is higher than the previous highest role, we set the highestRole equal to the new role, that way we will have the highest role all the way at the end
        if (role.position > highestRole.position) {
            highestRole = role;
        }
    });

    // We get the createdAt date from the server, and turn it into a datestring, this will remove a lot of "useless" information.
    // This will leave us with the day, month, date, year, for instance: "Mon Jan 1 2018"
    let createdAtRaw = guild.createdAt.toDateString();
    // We are going to split that string so we can order it differently, because I prefer dd/mm/yy over mm/dd/yy
    let createdAt = createdAtRaw.split(" ");
    
    // Here we just get the verificationlevel, which will return a number between 0 and 4
    let verificationLevel = guild.verificationLevel;
    
    // Then we switch the verificationlevel into the words, which are the same as the way discord shows them in the guild settings
    switch(verificationLevel) {
        case 0:
            verificationLevel = "None";
            break;
        case 1:
            verificationLevel = "Low";
            break;
        case 2:
            verificationLevel = "Medium";
            break;
        case 3:
            verificationLevel = "(╯°□°）╯︵ ┻━┻"; // <--- He mad.
            break;
        case 4:
            verificationLevel = "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"; // <--- He more mad!
            break;
    }
    
    // Now it's time to count the amount of text and voice channels, we start with 0 for each
    let textChannels = 0;
    let voiceChannels = 0;
    
    // Then for each channel in the guild will run this code
    guild.channels.forEach(channel => {
        // If the type of the channel is text (this means it's a textchannel), we add 1 to the textChannels, otherwise we add 1 to the voiceChannels
        channel.type === "text" ? textChannels++ : voiceChannels++;
    });
    
    // Now we get the afk channel of the guild. If it isn't set, it will return undefined
    let afkChannel = guild.afkChannel;
    // If we got an afk channel, we will set the afkChannel equal to the name. Otherwise we just set it to "None", to prevent it from showing undefined
    afkChannel ? afkChannel = afkChannel.name : afkChannel = "None";
    
    // Time to get all the emojis in the guild :> First we create an empty array to add the emojis to
    let emojis = [];
    // Again, we are going to loop through all the emojis
    guild.emojis.forEach(emoji => {
        // Then we push the emoji name into the array. I added the backticks "`" so it will look better in the end result
        emojis.push(`\`${emoji.name}\``);
    });
    // If there were no emojis, we set it to "None", otherwise we just join them together to create a nice look: `emoji1`, `emoji2`, `emoji3`
    emojis.length === 0 ? emojis = "None" : emojis = emojis.join(", ");
    
    // The last thing we need to do before creating the embed is getting all the roles, again creating an empty array
    let roles = [];
    // Again looping through all the roles
    guild.roles.forEach(role => {
        // And again pushing all the roles into the array
        roles.push(`\`${role.name}\``);
    });
    // Then we can just join the roles together. Since we will always have 1 role (@everyone), we don't need to check anything else for the roles
    roles = roles.join(", ");
    
    // Now we can just start on the embed ^-^
    const embed = new Discord.RichEmbed()
        .setTitle("Guildinfo")
        .setColor(highestRole.color) // We set the color of the embed to the color of the highest role in the guild
        .setDescription("This is the info of this guild!")
        .setThumbnail(guild.iconURL)
        .addField("Guild Name", guild.name, true)
        .addField("Guild ID", guild.id, true)
        .addField("Owner", guild.owner.user.tag, true)
        .addField("Owner ID", guild.ownerID, true)
        .addField("Created At", `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true) // Here we rearrange the dates, to create dd/mm/yy
        .addField("Members", guild.memberCount, true)
        .addField("Region", guild.region.toUpperCase(), true)
        .addField("Verification Level", verificationLevel, true)
        .addField("Text Channels", textChannels, true)
        .addField("Voice Channels", voiceChannels, true)
        .addField("AFK Channel", afkChannel, true)
        .addField("AFK Timeout", `${guild.afkTimeout} seconds`, true)
        .addField(`Emojis (${guild.emojis.size})`, emojis)
        .addField(`Roles (${guild.roles.size})`, roles);
    // And after we've added all the items, we can send the embed :D
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "guildinfo",
    type: "general",
    description: "Show info about the current guild",
    usage: `${prefix}guildinfo`
};