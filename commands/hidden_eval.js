const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;
const ownerID = config.ownerID;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    /*
                                            -----------------
                                            |   WARNING!    |
                                            -----------------
                    
            Eval is EXTREMELY dangerous, allowing people other than yourself access it is NOT recommended!
            
            Use it at your own risk, I am not responsible for any damage caused by using this command!
            If you wish not to use this command you can delete the command file to not deal with it anymore.
            
            If you wish to know the dangers of this command, you can view this article: https://anidiotsguide.gitbooks.io/discord-js-bot-guide/examples/making-an-eval-command.html
            
                                            -----------------
                                            |   WARNING!    |
                                            -----------------
    */
    
    
    
    // First we check if the owner is running the command, we do NOT want issues here!
    if (message.author.id !== ownerID) {
        const embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setColor(red)
            .setDescription("Only the bot owner may access the `eval` command!");
        message.channel.send(embed);
        message.react("❌");
        return;
    }
    
    // If the args length is 0, we return an error. We need code to run obviously
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}eval <code>`);
        message.channel.send(embed);
        return;
    }

    // After that we start to run the code
    try {
        // We start by adding the args together to form the code
        const code = args.join(" ");
        // Then we eval the code
        let evaled = eval(code);

        // Then we do some more eval magic here
        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }
    
        // At last we send the output in a codeblock back, but first we clean the output to prevent pings and stuff
        message.channel.send(clean(evaled), {code:"xl"});

    } catch (err) {
        // If theres an error we just clean the code, and send the error back
        message.channel.send(clean(err), {code:"xl"});
    }
    
    return;
};

// Time to clean the code?
const clean = text => {
    
    // If the type isn't a string, we need to replace the chars
    if (typeof(text) === "string") {
        // We replace all of the characters that would be causing issues with something else, not going into much detail though.
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        // Otherwise we can just return the normal message.
        return text;
  }
}

module.exports.help = {
    name: "eval",
    type: "hidden",
    description: "Run JavaScript code in realtime",
    usage: `${prefix}eval <code>`
};