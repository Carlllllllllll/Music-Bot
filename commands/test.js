const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'test',
  description: 'Get information about the bot owner.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const discordServerLink = 'https://discord.gg/aQHhb2Sb';
      const discordProfileLink = 'https://discordapp.com/users/1126336222206365696';

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setAuthor({
          name: 'Bot Owner',
        })
        .setDescription(`**Upades**
       
       New commands have been added: /help-us, /bot-info, and the playlists commands has been successfully created. Type /help to see how to use all bot commands.
       
       **Bug Fixed**
       
         When you type /play and enter your song name, you will receive ❌ No results found. **[FIXED]**
         
         **Changes**
         
         At this moment, there haven't been any changes.
         
         **Do you have a problem with our bot?**
         
         No worries! Join our support server and type /report; our support team is online 24/7.)`)
        .setImage('https://media1.tenor.com/m/7GyHsInT8uoAAAAC/naruto.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
