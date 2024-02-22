const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'help-us',
  description: 'Help us..',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/CgBZthGTXQ';

      const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setAuthor({
          name: '**Help Us**',
        })
       .setDescription(`Hello, I am Carl, the owner of this bot. Our bot is offered completely free and boasts high quality. However, we find ourselves in need of your assistance. The bot was created on 01/26/2024 and shared on the internet on 02/16/2024. We kindly ask for your help in verifying our bot by adding it to your server. Your support in this matter would mean a lot to us, and we sincerely appreciate your consideration. Thank you for taking the time to read this message. Please stay with us for more updates. Note: Feel free to type /help to discover all commands and gather more information about this bot.\nSupport Server: [Join Here](${supportServerLink})`)
       .setTimestamp()
       .setImage('https://media1.tenor.com/m/X6B3JAQGvy4AAAAC/pain-naruto.gif');
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
