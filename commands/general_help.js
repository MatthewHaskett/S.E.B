const Discord = require("discord.js");

const config = require("../config.json");
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

module.exports.run = async (bot, message, args) => {

    // HELP ME! I'M LOST!
    // Help command, the automatic masterpiece of this bot!
    
    // Creating this command, I wanted to make it automated. That way you only need to update this command when adding a new section to it. And doing so is quite easy aswell!
    
    
    
    // If you see code between a "/*" and a "*/" you can follow along like that to extend the help command with sections you want to add!
    
    // First we check if the args length is 0. If it is we know we just need to show all the commands. Otherwise we need to show more detailed info about a specific command
    if (args.length === 0) {
        
        // First we create an array for every section in the help command
        let general = [];
        let fun = [];
        let admin = [];
        /*let newSection = [];*/

        // Then we run through all the commands that we saved in our commands collection in the main class
        bot.commands.forEach(command => {
            
            // For each command we get the type, and switch the type. Then we add the type into the proper arraylist to seperate the commands
            let type = command.help.type.toLowerCase();
            switch(type) {
                case "general":
                    general.push(`\`${command.help.name.toLowerCase()}\``);
                    break;
                case "fun":
                    fun.push(`\`${command.help.name.toLowerCase()}\``);
                    break;
                case "admin":
                    admin.push(`\`${command.help.name.toLowerCase()}\``);
                    break;
                /*case "newSection":
                    newSection.push(`\`${command.help.name.toLowerCase()}\``);
                    break;*/
            }
        });

        // Then we count the amount of commands. We could've also done bot.commands.size, but that would also count commands that are "hidden"
        let commands = general.length + fun.length + admin.length /*+ newSection.length*/;

        // Then we just join all the items in the arrays together to create a nice list of all the commands per section
        general = general.join(", ");
        fun = fun.join(", ");
        admin = admin.join(", ");
        /*newSection = newSection.join(", ");*/

        // At last we create the embed, which all we have to do is create a field, add a field title, and add the string of commands to it
        const embed = new Discord.RichEmbed()
            .setTitle("Commands!")
            .setColor("#55ffff")
            .setDescription(`All the commands for the bot. Just note that you might not have access to all of them!\n\nYou view more detailed info of a command with the command \`${prefix}help <command>\``)
            .attachFile({attachment:'./images/help.png', name:'help.png'})
            .setThumbnail('attachment://help.png')
            .addField("Amount of Commands", `\`${commands}\` total commands`)
            .addField("General", general)
            .addField("Fun", fun)
            .addField("Admin", admin)
            /*.addField("newSection", newSection)*/
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            .setTimestamp(new Date());
        // That's it! Help command that gets automaticly updated can now be send for people to admire!
        message.channel.send(embed);
        return;
    }
    
    // Now if the args length is 1, we know the user wants to know more about a specific command (or they just messed up)
    if (args.length === 1) {

        // First we try to get the command from our commands collection
        let command = bot.commands.get(args[0]);
        
        // If it returns undefined, we can return an embed where we say we couldn't find a command with that specific name
        if (!command) {
            const embed = new Discord.RichEmbed()
                .setTitle("Invalid Command")
                .setColor(red)
                .setDescription(`Couldn't find a command with the name: **${args[0]}**`);
            message.channel.send(embed);
            return;
        }
        
        // Then we can just create the embed, pretty easy
        const embed = new Discord.RichEmbed()
            // We set the title to the command name, but we capitalize the first letter to make it look cleaner
            .setTitle(capitalizeFirstLetter(command.help.name))
            .setColor(green)
            // Then we get the description for the command from the help section of the command
            .setDescription(command.help.description)
            // And finally we get the usage out of the help section
            .addField("Usage", command.help.usage);
        // Ready to be send again :)
        message.channel.send(embed);
        return;
    }
    
    // If a person ends up at this point the user probably entered more than 1 argument, so we will just return a simple error message
    const embed = new Discord.RichEmbed()
        .setTitle("Invalid Usage")
        .setColor(red)
        .setDescription(`${prefix}help <command>`);
    message.channel.send(embed);
    return;
};

// This is just a sneaky capitalize first letter function to ... well, I think you know what it does :>
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports.help = {
    name: "help",
    type: "general",
    description: "Show all the commands or info about a specific command\n**[]** is optional!\n**<>** is required!",
    usage: `${prefix}help [command]`
};