const { MessageEmbed } = require('discord.js');

client.on('guildCreate', (guild) => {
    const embed = new MessageEmbed()
        .setTitle('Bot Added to Server')
        .setDescription(`Thanks for adding the bot to ${guild.name}!`)
        .setColor('#00ff00'); // You can customize the color

    // Convert to EmbedBuilder
    const embedBuilder = new MessageEmbed(embed);

    // Send the embedBuilder to a specific channel or use guild.owner.send(embedBuilder) to DM the server owner
    // Example: guild.channels.cache.find(channel => channel.name === 'general').send(embedBuilder);
});
