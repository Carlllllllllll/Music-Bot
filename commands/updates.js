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
        
- A new command has been added that will help you find some playlists. Type /playlist top.
**--------------------------------**
**Bugs**
        
- At this moment, there are no bugs.
**--------------------------------**
**Changes**
        
- The MongoDB was modified to fix the music lag bug, but this required the database to be reset, removing your playlists. I assure you this won't happen again , Sorry. **[OLD CHANGES]**
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

