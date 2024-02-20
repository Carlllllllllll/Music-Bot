const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'bot info',
  description: 'Get information about the bot.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/SZys86VkMQ';

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setAuthor({
          name: 'Bot Info',
        })
       .setDescription(`Hello! 🎵 I am Music Bot, and I have a deep love for music. Carl brought me to life, but as this is my first version, I might have a few bugs and quirks. No worries, though – Carl is here to help! 🤖✨ Join our support server for swift assistance and a musical journey together! 🎵🚀\nSupport Server: [Join Here](${supportServerLink})`)
       .setTimestamp()
       .setImage('https://media1.tenor.com/m/7GyHsInT8uoAAAAC/naruto.gif');
      .setFooter({ text: 'More info - Use /help command │ Made By 𝑪𝒂𝒓𝒍 ⚡' });
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
