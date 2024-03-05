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
      const lastRebootTime = new Date('02/20/2024');

      const currentTime = new Date();
      const uptimeSinceLastReboot = currentTime - lastRebootTime;

      const embed = new EmbedBuilder()
        .setColor('#11e008')
        .setAuthor({
          name: '📄 Information 📄',
        })
        .setDescription(`
**Bot Developers** \n\`\`\`Carl\`\`\`
**Bot Version** \n\`\`\`v1.2.0\`\`\`
**Bot System** \n\`\`\`Music System\`\`\`
**This bot was created on (MM/DD/YYYY)**  \n\`\`\`01/26/2024 , ${formatCreationTime(botCreationDate)}\`\`\`
**Bot Status** \n\`\`\`Working\`\`\` 
**Bot Uptime** \n\`\`\`${formatUptime(uptimeSinceLastReboot)}\`\`\`
**Commands Count** \n\`\`\`30 Commands\`\`\`
**Commands Status**: \n\`\`\`Working\`\`\`
`)

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

function formatCreationTime(creationTime) {
  const currentTime = new Date();
  const timeDifference = currentTime - creationTime;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let formattedTime = '';

  if (days > 0) {
    formattedTime += `${days} days `;
  }

  if (hours > 0) {
    formattedTime += `${hours} hours`;
  }

  return formattedTime.trim() || 'Less than an hour';
}
