const fs = require('fs');
const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.js');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// Load the greetings data from the JSON file
let greetingsData = {};
try {
    greetingsData = require('./greetings.json');
} catch (error) {
    console.error('Error loading greetings data:', error);
}

client.once('ready', () => {
    console.log('Bot is ready.');
});

client.on('guildCreate', async (guild) => {
    // Check if the guild has already been greeted
    if (greetingsData[guild.id]) {
        console.log(`Bot has already greeted ${guild.name}.`);
        return;
    }

    // Get the default text channel of the guild
    const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    
    // If a default text channel is found, send a message
    if (defaultChannel) {
        try {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Hello!')
                .setDescription(`I would like to thank you very much for adding me to your server. Let's share our vibe together!`)
                .addField('Invite me to a voice call', 'and let\'s dance!')
                .addField('Need help with my commands?', 'No worries, just type /help and let\'s go!')
                .setFooter('Your bot name', client.user.displayAvatarURL());
            
            await defaultChannel.send({ embeds: [embed] });

            // Add the guild to the greetings data to indicate it has been greeted
            greetingsData[guild.id] = true;
            fs.writeFileSync('./greetings.json', JSON.stringify(greetingsData, null, 2));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
});

client.login(config.TOKEN); // Assuming your token is stored in config.js
