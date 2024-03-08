const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'updates',
  description: 'Get information about the bot updates.',
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
        .setDescription(`**Updates**
        
- New version : 1.7.0!
**--------------------------------**
**Bugs**
        
- At this moment, there are no bugs.
**--------------------------------**
**Changes**
        
- Commands reply.`)
        .setImage('https://media1.tenor.com/m/E7HT0L0wlAgAAAAC/update-beat.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
