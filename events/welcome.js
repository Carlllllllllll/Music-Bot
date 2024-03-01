const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildCreate', (guild) => {
  // This event triggers when the bot joins a new server (guild)
  const welcomeMessage = 'Thank you for inviting me to your server! Check my lovely commands!';
  
  // Find a text channel to send the welcome message
  const textChannel = guild.channels.cache.find(channel => channel.isText());
  
  // Check if a text channel is found
  if (textChannel) {
    textChannel.send(welcomeMessage)
      .then(() => console.log(`Sent welcome message to ${guild.name}`))
      .catch(console.error);
  } else {
    console.error(`Unable to find a text channel in ${guild.name}`);
  }
});

// Log in to Discord
client.login('TOKEN');
