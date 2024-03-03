const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'support',
  description: 'Support links',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const discordServerLink = 'https://discord.gg/XuvB8URUez';
      const discordProfileLink = 'https://discordapp.com/users/1126336222206365696';

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setAuthor({
          name: 'Supportr',
        })
        .setDescription(`Need help? No worries, we are here.\n
          Support Server: [Join Here](${discordServerLink})\n
          Developer Profile: [Carl (Owner)](${discordProfileLink})`)
        .setImage('https://media1.tenor.com/m/MS32XqsnXAkAAAAC/friends-health.gif');

      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
