const { EmbedBuilder } = require('discord.js');
const db = require('../mongodb');

module.exports = {
  name: 'help',
  description: 'IMPORTANT COMMAND!',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/XuvB8URUez';

      const botCreationDate = new Date('01/26/2024');
      const lastRebootTime = new Date('02/20/2024');

      const currentTime = new Date();
      const uptimeSinceLastReboot = currentTime - lastRebootTime;

      const embed = new EmbedBuilder()
        .setColor('#11e008')
        .setAuthor({
          name: 'I am here to help you',
          iconURL: 'https://cdn.discordapp.com/attachments/1175487983915376662/1175667506791325706/communication.png?ex=656c10b0&is=65599bb0&hm=e378f1b355a2401bcab504b08a0766001d6b7c090c91ce0a7a7a87c868feb955&',
        })
        .setDescription(`
***PLEASE NOTE THAT THIS BOT DOESN'T HAVE ANY COMMANDS, ONLY A ? PREFIX. THE OWNER MADE THIS COMMAND TO HELP YOU ENJOY OUR LOVELY BOT WITHOUT COMPLICATIONS.***\n
**▶️ Basic Commands** \n\`\`avatar, support, userinfo\`\`\n
**▶️ Fun Commands** \n\`\`ascii, joke, roll\`\`\n
**▶️ Anime Commands** \n\`\`blush, cuddle, dance, slap, bonk, bully, hug, confused, kiss, pat, happy, smile, yes, highfive, wink, wave, thinking, sad, cry, stare, bored, scream, nervous, kill\`\`\n
**▶️ Image Commands** \n\`\`cat, dog, panda\`\`\n
**▶️ Utility Commands** \n\`\`kick, ban, serverinfo, clear, uptime\`\`
`)

      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
