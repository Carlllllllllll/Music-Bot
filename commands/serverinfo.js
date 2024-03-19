const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    aliases: ['server', 'sinfo'],
    description: 'Get information about server',
    execute(message, args) {
        const server = message.guild;
        const emojis = server.emojis.cache;
        const roles = server.roles.cache;

        // Fetch the server owner
        server.members.fetch(server.ownerId).then((owner) => {
            // Create an embed object using EmbedBuilder
            const embed = new EmbedBuilder()
                .setColor('#FFFFFF')
                .setTitle('📊 Server Info')
                .setThumbnail(server.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .setDescription(`
                    **Server Name:** ${server.name}
                    **Server ID:** ${server.id}
                    **Owner:** ${owner.user.tag}
                    **Created At:** ${server.createdAt.toUTCString()}
                    **Members:** ${server.memberCount}
                    **Emojis:** ${emojis.size} emojis
                    **Roles:** ${roles.size} roles
                `)
                .setTimestamp()
                .build(); // Assuming .build() is the method to finalize the embed

            message.reply({ embeds: [embed] });
        }).catch((error) => {
            console.error('Error fetching server owner:', error);
            message.reply('❌ An error occurred while fetching server information.');
        });
    },
};
