const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
  if (!channel) return;

  const message = `Thanks for adding me! This is a normal message sent by my bot.`;

  channel.send(message);
});

// Remove this line
// client.login('your-bot-token-goes-here');
