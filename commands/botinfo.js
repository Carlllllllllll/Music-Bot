const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'bot-info',
  description: 'Get information about the bot.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/XuvB8URUez';

      const botCreationDate = new Date('01/26/2024');
      const lastRebootTime = new Date('03/03/2024');

      const currentTime = new Date();
      const uptimeSinceLastReboot = currentTime - lastRebootTime;

      const embed = new EmbedBuilder()
        .setColor('#11e008')
        .setAuthor({
          name: 'Bot Info',
        })
        .setDescription(`Bot Developers: **Carl (Owner)**
Bot Version: **1.2.0**
Bot System: **Music System**
This bot was created on **${botCreationDate.toLocaleDateString()}**
Bot Status: **Working** 
Bot Uptime : 02/20/2024 That means that the bot has been online for **${formatUptime(uptimeSinceLastReboot)}**
Commands Count: **30**
Commands Status : **Working**
`)
        .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};

function formatUptime(uptime) {
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
