const { Client, Intents, MessageEmbed } = require('discord.js');

// EmbedBuilder function
function EmbedBuilder() {
    this.embed = new MessageEmbed();

    this.setColor = function(color) {
        this.embed.setColor(color);
        return this;
    };

    this.setTitle = function(title) {
        this.embed.setTitle(title);
        return this;
    };

    this.setDescription = function(description) {
        this.embed.setDescription(description);
        return this;
    };

    this.addField = function(name, value) {
        this.embed.addField(name, value);
        return this;
    };

    this.setFooter = function(text, iconURL) {
        this.embed.setFooter(text, iconURL);
        return this;
    };

    this.build = function() {
        return this.embed;
    };
}

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once('ready', () => {
    console.log('Bot is ready.');
});

client.on('guildCreate', async (guild) => {
    // Get the default text channel of the guild
    const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    
    // If a default text channel is found, send a message
    if (defaultChannel) {
        try {
            // Use EmbedBuilder to create the embed
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Hello!')
                .setDescription(`I would like to thank you very much for adding me to your server. Let's share our vibe together!`)
                .addField('Invite me to a voice call', 'and let\'s dance!')
                .addField('Need help with my commands?', 'No worries, just type /help and let\'s go!')
                .setFooter('Your bot name', client.user.displayAvatarURL())
                .build(); // Call build() to retrieve the MessageEmbed instance
            
            await defaultChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
});
