const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;
const ownerID = config.ownerID;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {
    
    // Destroy command which will "destroy" the bot (not literally, bot will function normal after restart)
    
    // Checking if the author of the message is the owner, if not we send a nice embed saying the user can't use the command
    if (!(message.author.id === ownerID)) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("Only the bot owner can use the `destroy` command!");
        message.channel.send(embed);
        message.react("❌");
        return;
    }

    // Returning a nice message before shutting down
    const embed = new Discord.RichEmbed()
        .setTitle("Shutting Down!")
        .setColor(orange)
        .setDescription("I am shutting down, I will no longer respond to message until I get started again!")
        .setFooter(`Executed by ${message.author.tag}`)
        .setTimestamp(new Date());
    await message.channel.send(embed);
    
    // Waiting for the bot to disconnect from the API, and sending a message once it did so we know it disconnected
    await bot.destroy();
    console.log("\n\nBot disconnected from the servers!\n");
    
    // Closing the entire process
    process.exit();
    return;
};

module.exports.help = {
    name: "destroy",
    type: "admin",
    description: "Shutdown the bot",
    usage: `${prefix}destroy`
};