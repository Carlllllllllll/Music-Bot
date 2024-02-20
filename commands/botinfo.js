const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bot_info',
  description: 'Get information about the bot.',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/SZys86VkMQ';

      const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Bot Information')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Hello! 🎵 I'm Music Bot, and I have a deep love for music. Carl brought me to life, but as this is my first version, I might have a few bugs and quirks. No worries, though – Carl is here to help! 🤖✨ Join our support server for swift assistance and a musical journey together! 🎶🚀\nSupport Server: [Join Here](${supportServerLink})`)
        .setImage('https://media1.tenor.com/m/7GyHsInT8uoAAAAC/naruto.gif')
        .setFooter('More info - Use /help command │ Made By 𝑪𝒂𝒓𝒍 ⚡');

      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
