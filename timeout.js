const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified duration',
    usage: '<user> <duration in minutes>',
    execute(message, args) {
        // Check if the user has the necessary permissions to use the command
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('❌ You do not have permission to use this command.');
        }

        // Check if both user and duration arguments are provided
        if (args.length !== 2) {
            return message.reply('❌ Please provide the user to timeout and the duration (in minutes).');
        }

        // Check if a user was mentioned or a member name was provided
        const userArg = args[0];
        const user = message.mentions.users.first() || message.guild.members.cache.find(member => member.user.username === userArg);
        if (!user) {
            return message.reply('❌ User not found in the server.');
        }

        // Parse the duration argument (in minutes)
        const duration = parseInt(args[1]);
        if (isNaN(duration) || duration <= 0) {
            return message.reply('❌ Please provide a valid timeout duration (in minutes).');
        }

        // Calculate the timeout end time (current time + duration)
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + duration);

        // Get the timeout role from the server (assuming the role is named 'Timeout')
        const timeoutRole = message.guild.roles.cache.find(role => role.name === 'Timeout');
        if (!timeoutRole) {
            return message.reply('❌ Timeout role not found in the server.');
        }

        // Add the timeout role to the mentioned user
        const member = message.guild.members.cache.get(user.id);
        member.roles.add(timeoutRole)
            .then(() => {
                // Create an embed object using EmbedBuilder
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('User Timeout ⏱️')
                    .setDescription(`
                        **User:** ${user.tag}
                        **Duration:** ${duration} minutes
                        **Timeout End Time:** ${endTime.toLocaleString()}
                        **Action Taken By:** ${message.author.tag}
                    `)
                    .setTimestamp();

                message.reply({ embeds: [embed] });
            })
            .catch((error) => {
                console.error('Error adding timeout role to user:', error);
                message.reply('❌ An error occurred while timing out the user.');
            });
    },
};
