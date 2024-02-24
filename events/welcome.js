const { Client, Intents, MessageEmbed } = require("discord.js");

// Initialize your bot client with intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Event handler for when your bot joins a server
client.on("guildCreate", (guild) => {
    // Find the first cached text channel where the bot has permissions to send messages
    const channel = guild.channels.cache.find(
        (channel) => channel.type === "GUILD_TEXT" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );

    // Create an embed message
    const welcomeEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("🤖 Bot Joined!")
        .setDescription("Thank you for inviting me! I'm here to assist you. Enjoy your time! 🎉");

    // Send the welcome message if a suitable channel is found
    if (channel) {
        channel.send({ embeds: [welcomeEmbed] })
            .catch(console.error); // Handle any errors during message sending
    } else {
        console.error("No suitable text channel found for sending the welcome message.");
    }
});

// Log in to your bot using your token
client.login("TOKEN");
