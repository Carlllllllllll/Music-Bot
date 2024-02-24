const { Client, Intents } = require('discord.js');
const myBot = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        // Add other intents based on the events your bot needs to handle
    ],
});

// ... (other bot setup code)

myBot.on('guildCreate', (guild) => {
    const embedBuilder = new MessageEmbed()
        .setTitle('Bot Added to Server')
        .setDescription(`Thanks for adding the bot to ${guild.name}!`)
        .setColor('#00ff00');

    // Send the embedBuilder to a specific channel or use guild.owner.send(embedBuilder) to DM the server owner
    // Example: guild.channels.cache.find(channel => channel.name === 'general').send(embedBuilder);
});

// ... (other event listeners and bot login code)

