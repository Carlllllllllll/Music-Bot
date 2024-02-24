const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'bot-status',
  description: 'Get information about the bot status.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const embed = new EmbedBuilder()
        .setDescription(`𝐌𝐮𝐬𝐢𝐜 𝐁𝐨𝐭 status: **Working Well**`);

      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
