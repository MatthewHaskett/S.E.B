const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const ownerID = config.ownerID;

module.exports.run = async (bot, message, args) => {

    // Setusername command, which will (spoiler alert) change the username of the bot.
    
    // Got to check if the author is the bot owner, don't want bad things happening
    if (!(message.author.id === ownerID)) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("Only the bot owner can use the `setusername` command!");
        message.channel.send(embed);
        message.react("❌");
        return;
    }

    // Then we check if there are any args, if there aren't we return a nice embed
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}setusername <name>`);
        message.channel.send(embed);
        return;
    }

    // Time to join the args together to create the new botname
    let name = args.join(" ");

    // We have to create 2 embeds in this case, embed 1 is the success embed, if we manage to change the name we send that
    const embedSuccess = new Discord.RichEmbed()
        .setTitle("Success!")
        .setColor(green)
        .setDescription(`Changed my username to: ${name}`);

    // This is the failure embed, which will get send when we get rate limited (you can only change the username twice per hour)
    const embedFailure = new Discord.RichEmbed()
        .setTitle("Error!")
        .setColor(red)
        .setDescription(`I am being rate limited! Please try again later!`);

    // Here we update the username, after that we send the success embed. If we get an error (which happens if we get rate limited) we return the failure embed
    bot.user.setUsername(name).then(user => {
        message.channel.send(embedSuccess)
    }).catch(err => {
        message.channel.send(embedFailure)
    });

    return;
};

module.exports.help = {
    name: "setusername",
    type: "admin",
    description: "Change the username of the bot. Only able to be used twice an hour!",
    usage: `${prefix}setusername <username>`
};