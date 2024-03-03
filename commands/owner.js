/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');

module.exports = {
  name: 'about-owner',
  description: 'Get information about the bot owner.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const discordServerLink = 'https://discord.gg/XuvB8URUez';
      const discordProfileLink = 'https://discordapp.com/users/1126336222206365696';

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setAuthor({
          name: 'About Owner',
        })
        .setDescription(`__**About me**__:\n\n Hello, I'm Carl, an Egyptian Discord bot developer and web developer. I specialize in building various web server applications, and I'm also a gamer who loves Naruto Uzumaki. If you need assistance, feel free to contact me on Discord , type /support to get out support links`)
        .setImage('https://media1.tenor.com/m/7GyHsInT8uoAAAAC/naruto.gif');
        
      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};



/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
