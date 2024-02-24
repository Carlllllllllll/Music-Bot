const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: '#0000ff',
  description: 'Get information about the bot updates',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const discordServerLink = 'https://discord.gg/XuvB8URUez';


      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`testststvdtyv`)
        
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
