const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    execute(message, args) {
        // Check if the user has the necessary permissions to use the command
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('❌ You do not have permission to use this command.');
        }

        // Check if a user was mentioned in the command
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('❌ You need to mention a user to kick.');
        }

        // Kick the mentioned user
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('❌ User not found in the server.');
        }
        member.kick()
            .then(() => {
                // Create an embed object using EmbedBuilder
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('User Kicked ✅')
                    .setDescription(`▶️ ${user.tag} has been kicked from the server by ${message.author.tag}.`)
                    .setTimestamp()
                    .build(); // Assuming .build() is the method to finalize the embed

                message.reply({ embeds: [embed] });
            })
            .catch(error => {
                console.error('Error kicking user:', error);
                message.reply('❌ An error occurred while kicking the user.');
            });
    },
};
