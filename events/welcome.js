const { Intents } = require('discord.js');
const config = require('./config');

const myBot = // Your existing bot instance, obtained from the login code in config.js

myBot.on('guildCreate', (guild) => {
    const welcomeMessage = `Thanks for adding the bot to ${guild.name}!`;

    // Send the welcome message to a specific channel or use guild.owner.send(welcomeMessage) to DM the server owner
    // Example: 
    const welcomeChannel = guild.channels.cache.find(channel => 
        channel.name === 'general' || 
        channel.name === 'main' || 
        channel.name === 'chat' || 
        channel.name === 'welcome'
    );
    
    if (welcomeChannel) {
        welcomeChannel.send(welcomeMessage);
    }
});

// Other event listeners and bot functionality can be added here as needed


