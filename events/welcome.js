const Discord = require("discord.js");

// Initialize your bot client
const client = new Discord.Client();

// Event handler for when your bot joins a server
client.on("guildCreate", (guild) => {
    // Find the first cached text channel where the bot has permissions to send messages
    const channel = guild.channels.cache.find(
        (channel) => channel.type === "GUILD_TEXT" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );

    // Send the welcome message if a suitable channel is found
    if (channel) {
        channel.send("Thank you for inviting me! I'm here to assist you. Enjoy your time! 🤖");
    } else {
        console.error("No suitable text channel found for sending the welcome message.");
    }
});

// Log in to your bot using your token
client.login("YOUR_BOT_TOKEN");



