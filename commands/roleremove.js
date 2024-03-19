const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roleremove',
    description: 'Remove a role from a user',
    usage: '<user> <role>',
    execute(message, args) {
        // Check if the user has the necessary permissions to use the command
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('❌ You do not have permission to use this command.');
        }

        // Check if both user and role arguments are provided
        if (args.length !== 2) {
            return message.reply('❌ Please provide the user and the role to remove.');
        }

        // Check if a user was mentioned or a member name was provided
        const userArg = args[0];
        const user = message.mentions.users.first() || message.guild.members.cache.find(member => member.user.username === userArg);
        if (!user) {
            return message.reply('❌ User not found in the server.');
        }

        // Check if a role name or mention was provided
        const roleName = args[1];
        const role = message.guild.roles.cache.find(r => r.name === roleName) || message.guild.roles.cache.find(r => r.id === roleName);
        if (!role) {
            return message.reply('❌ Role not found in the server.');
        }

        // Remove the role from the mentioned user
        const member = message.guild.members.cache.get(user.id);
        member.roles.remove(role)
            .then(() => {
                // Create an embed object using EmbedBuilder
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Role Removed ❌')
                    .setDescription(`**User:** ${user.tag}\n**Role Removed:** ${role.name}\n**Action Taken By:** ${message.author.tag}`)
                    .setTimestamp();

                message.reply({ embeds: [embed] });
            })
            .catch((error) => {
                console.error('Error removing role from user:', error);
                message.reply('❌ An error occurred while removing the role from the user.');
            });
    },
};
