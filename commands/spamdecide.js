const { Client, Intents, Collection } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const logsChannelId = '1191002211635970128'; // Replace this with your logs channel ID
const spamCooldown = 3000; // Time in milliseconds to consider messages as spam
const maxSpamCount = 2; // Maximum number of repeated messages to be considered as spam

// Collection to store message timestamps for spam detection
const spamDetection = new Collection();

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    // Check if the message is considered as spam
    if (isSpam(message)) {
        try {
            // Delete the message
            await message.delete();

            // Send a log message to the logs channel
            const logsChannel = message.guild.channels.cache.get(logsChannelId);
            if (logsChannel) {
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Spam Message Deleted ❌')
                    .setDescription(`**User:** ${message.author.tag}\n**Channel:** ${message.channel}\n**Message Content:**\n${message.content}`)
                    .setTimestamp()
                    .build(); // Assuming .build() is the method to finalize the embed

                await logsChannel.send({ embeds: [embed] });
            }

            // Notify the user about the deletion
            await message.author.send('⚠️ Your message was deleted due to spamming.');

        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
});

client.login('TOKEN'); // Replace 'YOUR_BOT_TOKEN' with your actual bot token

// Function to check if a message is considered as spam
function isSpam(message) {
    const currentTime = Date.now();
    const userMessages = spamDetection.get(message.author.id) || [];
    userMessages.push(currentTime);

    // Remove old timestamps (older than the cooldown)
    const filteredMessages = userMessages.filter((timestamp) => currentTime - timestamp < spamCooldown);
    spamDetection.set(message.author.id, filteredMessages);

    return filteredMessages.length > maxSpamCount;
}
