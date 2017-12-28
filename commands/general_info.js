const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    /*
                                                            -----------------
                                                            |               |
                                                            |   ATTENTION!  |
                                                            |               |
                                                            -----------------
                                                            
                                This bot may be open-source, but theres still somebody that spends hours on making it.
                                    That's why I want to ask you to PLEASE NOT change or remove this command.
                                        I would really appreciate it :> and theres not much more I ask.
                                        
    */


    const embed = new Discord.RichEmbed()
        .setAuthor("S.E.B", bot.user.avatarURL)
        .setColor(red)
        .attachFile({attachment:'./images/info.png', name:'info.png'})
        .setThumbnail('attachment://info.png')
        .addField("Beep Boop Beep", "My name is **Super Emazing Bot** aka **S.E.B**. I'm an open-source bot that has various features, `!help` to check my commands, developed to be a fun and useful bot, but also to be an example for other people wanting to develop bots!")
        .addField("Who was I created by?", "I was coded by **SebastiaanYN#9619** in JavaScript, using the discord.js library. Coded with love ♥")
        .addField("I want you!", "Uhh, I guess you can? I am *soon* available for download on [GitHub](https://github.com/SebastiaanYN/S.E.B)! \nPlease read the README file so you understand the ToS of using me!")
        .addField("I want a custom bot!", "If you want a custom bot you can PM me (**SebastiaanYN#9619**) for more info about custom bots!")
        .setFooter("© SebastiaanYN#9619")
        .setTimestamp(new Date());
    message.channel.send(embed);
    return;
    
    /*
    
                    Before you continue, I just want to thank you for checking out my bot. Make sure to show it to your friends, family and more!
                      If you ever need help with my bot, your own bot or anything else, you can join my discord here: https://discord.gg/HkQMMtQ
    
                                                                        Have a nice day!
    
    */
};

module.exports.help = {
    name: "info",
    type: "general",
    description: "Show info about the bot and the creator (**SebastiaanYN#9619**)",
    usage: `${prefix}info`
};