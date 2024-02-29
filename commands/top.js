const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'recommended-playlists',
  description: 'Some playlists will let you dance',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const discordServerLink = 'https://discord.gg/XuvB8URUez';
      

      const embed = new EmbedBuilder()
        .setColor('#FFFF00')
        .setDescription(`**Here is some playlists will let you dance 💃🕺**

- Playlist name: **Phonks** 

**Kindly note that this command still in devolpent we will add more playlists soon as well**`)
        .setImage('https://media1.tenor.com/m/u6r8fswiki4AAAAC/dancing-minion.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
