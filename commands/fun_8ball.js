const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

let ball = config.eightball;

module.exports.run = async (bot, message, args) => {
    
    // 8ball command, the magic 8ball will respond to your questions... 
    // You can find out why this is a thing here: https://en.wikipedia.org/wiki/Magic_8-Ball
    
    // First of all we check if the length of the args is smaller than 2, can't really ask a question in 2 words can you?
    if (args.length < 2) {
        const embed = new Discord.RichEmbed()
            .setTitle("I sence a mistake")
            .setColor(red)
            .setDescription("Please answer a valid question!");
        message.channel.send(embed);
        return;
    }
    
    // Then we join the args together, and set the question equal to the last character of the msg
    let msg = args.join(" ");
    let question = msg.slice(-1);
    // After that we check if the question variable is a questionmark. This will make it so the final character of the args HAS to be a questionmark. This will make it more realistic
    if (question !== "?") {
        const embed = new Discord.RichEmbed()
            .setTitle("I feel like something is missing")
            .setColor(red)
            .setDescription("It doesn't really look like a question, does it? (Hint: `?`)");
        message.channel.send(embed);
        return;
    }
    
    // Here we check if the amount of characters of the question is below 10 chars. If it is we send a message back, again to make it look more realistic
    if (msg.length < 10) {
        const embed = new Discord.RichEmbed()
            .setTitle("I feel like something is missing")
            .setColor(red)
            .setDescription("It doesn't really look like a question, does it? Try rephrasing the question.");
        message.channel.send(embed);
        return;
    }
    
    // Time to generate a random number between 0 and the length of the arraylist
    let number = Math.floor(Math.random() * ball.length);

    // And here we just send back a nice looking embed, which includes an image of an 8ball, and the reponse of the 8ball
    const embed = new Discord.RichEmbed()
        .attachFile({attachment:'./images/8ball.png', name:'8ball.png'})
        .setAuthor("8ball", 'attachment://8ball.png')
        .setColor("#a40fad")
        .setDescription(ball[number]);
    message.channel.send(embed);

    // 8ball is entirely rigged yes.
    return;
};

module.exports.help = {
    name: "8ball",
    type: "fun",
    description: "Ask a question to the magic 8ball",
    usage: `${prefix}8ball <question>`
};