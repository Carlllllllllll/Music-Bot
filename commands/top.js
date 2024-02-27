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
        .setColor('#0864e0')
        .setAuthor({
          name: 'News',
        })
        .setDescription(`Here are some recommended playlists:
- Playlist name: **Phonks** 🎶


***Kindly note that this command is still in development. The staff team will add some playlists as soon as they can. 🎵 Good music, good life! 🌟***`)
        .setImage('https://media1.tenor.com/m/u6r8fswiki4AAAAC/dancing-minion.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
