const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");
module.exports = {
    name: 'support',
    description: 'support server of this Bot',
    execute(message, args) {
              const discordServerLink = 'https://discord.gg/XuvB8URUez';
      const discordProfileLink = 'https://discordapp.com/users/1126336222206365696';

      const embed = new EmbedBuilder()
        .setColor('#ffffff')
        .setAuthor({
          name: 'Support',
        })
        .setDescription(`\nNeed help? No worries, we are here.\n
Support Server: [Join Here](${discordServerLink})\n
Developer Profile: [Carl (Owner)](${discordProfileLink})`)
    



        message.reply({ embeds: [embed] });
    },
};
