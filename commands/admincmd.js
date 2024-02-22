const Discord = require('discord.js');
const { prefix, token } = require('./config.json'); // Adjust the path accordingly

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    if (message.content.startsWith(`${prefix}admincmd`)) {
        client.guilds.cache.forEach((guild) => {
            const channel = guild.channels.cache.find((ch) => ch.type === 'text' && ch.permissionsFor(guild.me).has('SEND_MESSAGES'));
            if (channel) {
                // Send your message to any available text channel
                channel.send('Your specific message here.');
            }
        });
    }
});


