const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
config(); // Load environment variables from a .env file

const intents = new Intents().add('GUILD_MESSAGES', 'GUILDS');
const bot = new Client({ intents });

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.username}`);
});

let rateLimitDelay = 5000; // Initial delay between messages (in milliseconds)
const successInGuild = {}; // Object to track success in each guild

bot.on('messageCreate', async message => {
    if (!message.content.startsWith('.')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'all') {
        const commandToExecute = args.join(' ');
        for (const guild of bot.guilds.cache.values()) {
            if (successInGuild[guild.id]) continue; // Skip the guild if a message was sent successfully before

            const textChannels = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
            for (const textChannel of textChannels.values()) {
                try {
                    await textChannel.send(commandToExecute);
                    await new Promise(resolve => setTimeout(resolve, rateLimitDelay)); // Delay between messages
                    successInGuild[guild.id] = true;
                    break;
                } catch (error) {
                    console.error(`Error executing command in ${guild.name}: ${error}`);
                    if (error.code === 50013) console.error(`Missing Permissions in ${guild.name}`);
                    continue;
                }
            }
        }
    }
});

const botToken = process.env.TOKEN;
bot.login(TOKEN);
