const { SlashCommandBuilder, MessageEmbed, Routes, DataResolver } = require('discord.js');

module.exports = {
  owner: true,
  data: new SlashCommandBuilder()
    .setName('botbanner')
    .setDescription("Add a banner to your discord bot")
    .addAttachmentOption(option => option.setName('banner').setDescription('The banner to add').setRequired(true)),
  async execute(interaction) {
    const { options } = interaction;
    const banner = options.getAttachment('banner');

    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor("BLUE")
        .setDescription(message);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!banner) return await sendMessage(`Please provide a banner.`);
    if (!['image/gif', 'image/png'].includes(banner.contentType)) {
      return await sendMessage(`The banner must be a GIF or PNG file.`);
    }

    try {
      await interaction.guild?.setIcon(await DataResolver.resolveImage(banner.url));
      await sendMessage(`Banner updated successfully.`);
    } catch (err) {
      console.error(err);
      await sendMessage(`Error: \`${err.toString()}\``);
    }
  }
};
