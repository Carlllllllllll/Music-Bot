const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');

const intents = new Intents().all();
const bot = new Client({ intents });

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

// Add variables for rate limiting and tracking success
const rateLimitDelay = 5000;  // Initial delay between messages in milliseconds
const successInGuild = {};    // Object to track success in each guild

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'all') {
    const commandToExecute = args.join(' ');

    for (const guild of bot.guilds.cache.values()) {
      if (guild.id in successInGuild && successInGuild[guild.id]) {
        continue;  // Skip the guild if a message was sent successfully before
      }

      for (const textChannel of guild.channels.cache.filter(channel => channel.type === 'text').values()) {
        try {
          await textChannel.send(commandToExecute);
          await new Promise(resolve => setTimeout(resolve, rateLimitDelay));
          successInGuild[guild.id] = true;
          break;
        } catch (error) {
          if (error.code === 50013) {
            console.log(`Error executing command in ${guild.name}: ${error}: Missing Permissions`);
            continue;
          } else if (error.code === 429) {
            await new Promise(resolve => setTimeout(resolve, 5000));
          } else {
            console.log(`Error executing command in ${guild.name}: ${error}`);
          }
        }
      }
    }
  }
});

config();  // Load environment variables from a .env file
const botToken = process.env.TOKEN;
bot.login(botToken);
