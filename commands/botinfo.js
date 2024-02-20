const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'bot-info',
  description: 'Get information about the bot.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/aQHhb2Sb';

      const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setAuthor({
          name: 'Bot Info',
        })
       .setDescription(`Hello! 🎵 I am Music Bot, and I have a deep love for music. Carl brought me to life, but as this is my first version, I might have a few bugs and quirks. No worries, though Carl is here to help! 🤖 ✨ Join our support server for swift assistance and a musical journey together! 🎵 🚀 \nSupport Server: [Join Here](${supportServerLink})`)
       .setTimestamp()
       .setImage('https://media1.tenor.com/m/WI5z7d934jIAAAAC/naruto-smile.gif');
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
