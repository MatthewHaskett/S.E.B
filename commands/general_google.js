const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // Google command, annoy people with lmgtfy links!
    
    // First we have to check if the args length is 0, we need something to google ofcourse
    if (args.length === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Invalid Usage")
            .setColor(red)
            .setDescription(`${prefix}google <input>`);
        message.channel.send(embed);
        return;
    }
    
    // We will join the args together into our google variable
    let google = args.join(" ");
    // Now we add the args after the lmgtfy url, this will make url look something like this: "http://lmgtfy.com/?q=I want to google this"
    let url = `http://lmgtfy.com/?q=${google}`;
    // We can't use a link that contains spaces and certain characters, that's why we need to encode it to make it work like a proper url. We use the build-in encodeURI feature for that. After that we will have an url that looks something like this: "http://lmgtfy.com/?q=I%20want%20to%20google%20this"
    let encode = encodeURI(url);
    
    // Now we just create the embed that will contain our message
    const embed = new Discord.RichEmbed()
        .setTitle("Google")
        .setColor(green)
        // I used the richembed feature to hide the link behind the word "this", you could remove it if you wish to
        .setDescription(`You should google [this](${encode})!`);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "google",
    type: "general",
    description: "Convert a question into a lmgtfy link to annoy people with",
    usage: `${prefix}google <question>`
};