const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const main = require("../bot.js");
let commandsRan = main.getCommandsRan;

// This is a pretty complicated function, so bare with me
function time( milliseconds ) {
    
    // It's "time" to create the variables. (It's possible to add month to it if you wish) (pun was intended.)
    let day, hour, minute, seconds;
    
    // Then we just do a whole LOT, like a serious amount of math. Not to hard, but also not easy. This will leave us with the right value for each variable
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    // Here we just create the string that will be the start for our full string. It contains placeholders (%variable%), so we can change it easier later on
    let string = `\`${day}\` %day%, \`${hour}\` %hour%, \`${minute}\` %minute% and \`${seconds}\` %seconds%`;

    // Now it's "time" to replace the placeholders. One thing about time is that you have "0 days", "1 day", and "2 days"
    // That's why we need to check if the values are 1, if it is we don't add a "S" to the end of the string, otherwise we do
    // we obviously need proper grammar, don't we?
    string = string.replace("%day%", "day" + (day === 1 ? "" : "s"));
    string = string.replace("%hour%", "hour" + (hour === 1 ? "" : "s"));
    string = string.replace("%minute%", "minute" + (minute === 1 ? "" : "s"));
    string = string.replace("%seconds%", "second" + (seconds === 1 ? "" : "s"));

    // This will leave us with a string that will look something like this: "1 day, 0 hours, 1 minute and 51 seconds"
    return string;
};

module.exports.run = async (bot, message, args) => {

    // STATISTICS! MATH! SCHOOL!
    // All things we hate!
    
    // Stats command, the general statistics about the bot!
    
    // First we just send a ping message, this will be used to fetch the responsetine (ping) of the bot. We do that by subtracting the timestamp of this message, from the command message. That will leave us with x amount of miliseconds
    const ping = await message.channel.send("Fetching Data");
    
    // Then we just create the general embed. For some reason I called it embedPing even though it shows more stuff
    const embedPing = new Discord.RichEmbed()
        .setTitle("Stats")
        .setColor("#55ffff")
        .setDescription("This will show various stats about the bot")
        // Just doing a sneaky image addition
        .attachFile({attachment:'./images/stats.png', name:'stats.png'})
        .setThumbnail('attachment://stats.png')
        // Then it's time to get the ping. Again, subtract the ping createtimestamp from the message's, that will leave x amount of ms
        .addField("Ping", `🏓 \`${ping.createdTimestamp - message.createdTimestamp}\`ms`, true)
        // Then we get the hearthbeat. This is just the ping between the bot and the api
        .addField("Hearthbeat", `💓 \`${Math.round(bot.ping)}\`ms`, true)
        // Guild count, speaks for itself
        .addField("Guild Count", `🏙 \`${bot.guilds.size}\``, true)
        // Here we get the amount of commands ran by calling the commandsRan function out of our main class, which will return us a number
        .addField("Commands Executed", `📝 \`${commandsRan()}\``, true)
        // Then we get the bot uptime (which is in miliseconds), which we turn into real time with the function at the top of the code
        .addField("Uptime", `🕙 ${time(bot.uptime)}`);
    message.channel.send(embedPing);
    
    // Then after we've send the message, we can delete the ping message, so we don't leave unnecessary messages
    ping.delete();
    return;
};

module.exports.help = {
    name: "stats",
    type: "general",
    description: "Show various stats about the bot",
    usage: `${prefix}stats`
};