const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'Updates',
  description: 'See bot update',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/CgBZthGTXQ';
      const BotInviteLink = 'https://discord.com/oauth2/authorize?client_id=1200206489260933232&permissions=8&scope=bot';

      const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setAuthor({
          name: 'Updates',
        })
       .setDescription(`**Upades**
       
       New commands have been added: /help-us, /bot-info, and the playlists commands has been successfully created. Type /help to see how to use all bot commands.
       
       **Bug Fixed**
       
         When you type /play and enter your song name, you will receive ❌ No results found. **[FIXED]**
         
         **Changes**
         
         At this moment, there haven't been any changes.
         
         **Do you have a problem with our bot?**
         
         No worries! Join our support server and type /report; our support team is online 24/7.`)
        
      
       .setImage('https://media1.tenor.com/m/N6X3ceoYtUkAAAAC/never-update-chicken.gif');
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
