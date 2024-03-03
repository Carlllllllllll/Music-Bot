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

      const embed = new EmbedBuilder()
        .setColor('#11e008')
        .setAuthor({
          name: 'Bot Info',
        })
       .setDescription(`Bot Developers: **Carl (Owner)**
Bot Version: **1.2.0**
Bot System: **Music System**
This bot was created on **01/16/2024**.
Bot Status: Online since **03/03/2024** **Since the last reboot**.
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
