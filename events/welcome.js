const { Client, Intents } = require('discord.js');
const myBot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        // Add other intents based on the events your bot needs to handle
    ],
});

// ... (other bot setup code)

myBot.on('guildCreate', (guild) => {
    const welcomeMessage = `Thanks for adding the bot to ${guild.name}!`;

    // Send the welcome message to a specific channel or use guild.owner.send(welcomeMessage) to DM the server owner
    // Example: guild.channels.cache.find(channel => channel.name === 'general').send(welcomeMessage);
});

// ... (other event listeners and bot login code)


