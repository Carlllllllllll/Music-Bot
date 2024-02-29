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
        
- A new command update: the previous name /playlist top has been changed to the new command name /recommended playlists. Sorry for any confusion, but the staff members removed that members can add his playlist in puplic for privacy.
**--------------------------------**
**Bugs**
        
- At this moment, there are no bugs.
**--------------------------------**
**Changes**
        
- At this moment, there are no changes.
**--------------------------------**
**Do you have a problem with our bot?**
        
- No worries! Join our support server and type /report our support team is always online. \n Support Server: [Join Here](${discordServerLink})`)
        .setImage('https://media1.tenor.com/m/E7HT0L0wlAgAAAAC/update-beat.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
