const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add a role to a user',
    usage: '<user> <role>',
    execute(message, args) {
        // Check if the user has the necessary permissions to use the command
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('❌ You do not have permission to use this command.');
        }

        // Check if both user and role arguments are provided
        if (args.length !== 2) {
            return message.reply('❌ Please provide the user and the role to add.');
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

        // Add the role to the mentioned user
        const member = message.guild.members.cache.get(user.id);
        member.roles.add(role)
            .then(() => {
                // Create an embed object using EmbedBuilder
                const embed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('Role Added ✅')
                    .setDescription(`**User:** ${user.tag}\n**Role Added:** ${role.name}\n**Action Taken By:** ${message.author.tag}`)
                    .setTimestamp();

                message.reply({ embeds: [embed] });
            })
            .catch((error) => {
                console.error('Error adding role to user:', error);
                message.reply('❌ An error occurred while adding the role to the user.');
            });
    },
};
