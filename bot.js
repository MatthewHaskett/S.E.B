
//                                          Before you continue reading, please make sure you have read the README.txt file!




// Requiring lots of stuff like the config, tokens, colors, responses and more
const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");

const botToken = config.token;
const prefix = config.prefix;

const green = config.green;
const orange = config.orange;
const red = config.red;

const playingStatus = config.playingStatus;
const mentionResponse = config.mentionResponse;
const permissions = config.permissions;

// Declaring the bot (some people call it client)
const bot = new Discord.Client({disableEveryone: true});

// Counter to show the amount of commands that have been ran since the start of the bot
let commandsRan = 0;

// Creating a new collection for all our commands
bot.commands = new Discord.Collection();
// Reading the commands folder
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    
    // Here we filter out all the files that are JS files and create a list of them
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    
    // Checking if there are any commands, if not we cancel out and return a message
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }
    
    // Logging the amount of commands/files there are to load
    console.log(`\nLoading ${jsfiles.length} commands!\n`);
    
    // For each entry in the jsfiles variable we require the file, log some info and add it to our awesome commands collection
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Loaded command file ${i + 1}: ${f}\n                       ${prefix}${props.help.name}\n`);
        bot.commands.set(props.help.name.toLowerCase(), props);
    });
});

// Some simple function that capitalizes the first letter of a string
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Getter for the commandsRan variable, easy way of accessing the variable from other classes
const getCommandsRan = () => {
    return commandsRan;
}
// Exporting the function so we can use it in other classes (important)
exports.getCommandsRan = getCommandsRan;

// This event gets fired when the bot is in it's "ready" state. Meaning the bot is fully launched
bot.on("ready", async () => {
    // We just log a nice message saying the bot started up
    console.log("\n----------------------------------------------------------------------------------------------------------\n\nBot has started up!");
    console.log(`Logged in as: ${bot.user.tag} \n`);
    
    // Here we try to generate an invite link so we can invite our bot to our guild, the permission we want is ADMINISTRATOR because it's the most straight forward permission.
    // This will also create a standard role for the bot, with the application name as the default role name
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(`Invite Link: ${link} \n\n----------------------------------------------------------------------------------------------------------`);
    } catch (e){
        console.log(e.stack);
    }
    
    // Here we set the bots playing status to the playing status we imported from the config file all the way at the top of our code
    bot.user.setGame(playingStatus);
    
});

// This event gets fired whenever a message gets sent to any guild the bot is in
bot.on("message", async message => {

    // We will start doing some checking from this point on to see if we are going to run a command or not.
    
    // Declaring all our variables we will be using in this codeblock so we don't have to declare it over and over again
    let messageArray, command, args, cmd, mention, response;
    
    // Checking if the author of the message is a bot, if true we return. Don't want other bots triggering our commands, do we?
    if (message.author.bot) return;
    // Here we check if the channel is a dm channel, this will make sure we don't have to deal with unnecessary errors
    if (message.channel.type === "dm") return;

    // Splitting the message into an array, this way we can easily get the args and more
    messageArray = message.content.split(" ");
    
    // Here we check if the bot is mentioned, and if the length of the array (the amount of words in the message) is 1. This means this codeblock will ONLY trigger when the bot is mentioned in a message, and nothing else is included in the message.
    if (message.isMentioned(bot.user.id) && messageArray.length === 1) {
        
        // Here we get a random message to return as a response (from the arraylist in the config file again)
        response = Math.floor(Math.random() * mentionResponse.length);
        // Here we send the respond to the channel
        message.channel.send("" + mentionResponse[response]);
        // Returning again to make sure this is all we will do
        return;
    }

    // It's time to check if the bot got mentioned and a command was followed with it. This code was tricky to make, since I wanted to have a functioning prefix, but also have the bot mentionable as a "prefix".
    // So what I did is check if the first argument in the array is a mention (making use of some nice regex), check if the bot is getting mentioned in the message, and if the message is longer as 1 word
    if (/<@!?\d+>/.test(messageArray[0]) && message.isMentioned(bot.user.id) && messageArray.length >= 2) {
        
        // In this case the message should look something like this: "@Bot_Name <command> [and maybe some other stuff]"
        // So now we can cut of the command, which is always the second argument in the array in this case (also turning it to lowercase to prevent problems)
        command = messageArray[1].toLowerCase();
        // Then we cut of the first 2 arguments, which will always be the mention, and the command. This will leave us with our args, which we can use lateron
        args = messageArray.slice(2);
        // Now we set the mention to true, since the bot was mentioned, which will be used later to do some coding "magic"
        mention = true;
        
    } else {
        
        // If the bot wasn't mentioned, and we got to this part, the message would look something like this: "<prefix><command> [and maybe some other stuff]"
        // We set the command to the first argument, this will leave the prefix in (for now)
        command = messageArray[0].toLowerCase();
        // Here we cut of the command again to leave us with the args
        args = messageArray.slice(1);
        // And we set the mention to false, since the bot didn't get mentioned, which will be used again later
        mention = false;
    }

    // Here we just check if the command doesn't start with our prefix, and if the bot didn't get mentioned.
    // If both true, there wasn't a command ran. If one (or both) true, we can ALMOST say a command was ran!
    if (!(command.startsWith(prefix)) && !(message.isMentioned(bot.user.id))) return;

    // Here we create a short if statement. If "mention = true", cmd is now the command that we get from our commands collection.
    // If "mention = false", cmd is the command that we get from our commands collection, but we slice of the amount of chars our prefix has (removing the prefix)
    mention ? cmd = bot.commands.get(command) : cmd = bot.commands.get(command.slice(prefix.length));

    // Here we create a new arraylist with missing permissions, that way I don't have to do permission checking all the time
    let missingPermission = [];
    
    // For each permission that we had set in our config file, and important to our code, we run this code.
    permissions.forEach(permission => {
        
        // Time to see if we miss a permission. If we don't have the permission "permission" (the variable we use), we push the permission into the array
        if (!message.channel.permissionsFor(message.guild.me).has(permission)) {
            missingPermission.push(`\`${permission}\``);
        }
    });
    
    // If the array is not empty (we are missing permissions), we need to let them know
    if (missingPermission.length !== 0)) {
        
        // We just join the permissions out of the array together to make it look nice and clean
        missingPermission.join(", ");
        // Before sending it we must check if we have the permission to send a message, that way we don't have to bother with errors
        if (message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
            
            // If we have permission, we send a message saying which permissions we are missing
            message.channel.send(`❌ **I am missing required permissions:** ${missingPermission}`);
        }
        // Ofcourse we have to return, otherwise this would've all be pointless
        return;
    }

    // If our cmd is not undefined we will run the following code. Our cmd will be undefined if the command wasn't found in our commands collection
    if (cmd) {
        
        // We just run the command, passing through some stuff we need in the other files
        cmd.run(bot, message, args);
        // Adding 1 to the commandsRan counter. (otherwise it isn't really counting, is it?)
        commandsRan += 1;
    }
    return;
});

// Oh, and we have to login to our bot account ofcourse. Very important!
// Fill in the token in the config file, for security reasons :D
bot.login(botToken);