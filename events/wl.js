const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
  if (!channel) return;

  const message = `Thanks for adding me! This is a normal message sent by my bot.`;

  channel.send(message);
});

// client.login('your-bot-token-goes-here');
