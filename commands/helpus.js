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
      const BotInviteLink = 'https://discord.com/oauth2/authorize?client_id=1200206489260933232&permissions=8&scope=bot';

      const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setAuthor({
          name: 'Help Us',
        })
       .setDescription(`Dear Member,

I would like to express my gratitude for your time and consideration. Our bot, designed with a commitment to both quality and accessibility, is offered completely free of charge.

The bot, created on 01/26/2024, was shared on the internet on 02/16/2024. In our pursuit of excellence, we now find ourselves in need of your assistance. We kindly request your support in verifying our bot by considering its addition to your server.

Your collaboration in this matter holds significant value for us, and we sincerely appreciate your thoughtful consideration. Thank you for taking the time to read this message, and we look forward to the possibility of working together. Please stay with us for more updates.

Feel free to explore all the commands and gather more information about this bot by typing /help.

Warm regards,

Carl (Owner) \nBot Invite link: [Press Here](${BotInviteLink}) \nSupport Server: [Join Here](${supportServerLink})`)
       .setTimestamp()
       .setImage('https://media1.tenor.com/m/X6B3JAQGvy4AAAAC/pain-naruto.gif');
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
