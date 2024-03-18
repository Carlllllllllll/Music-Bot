const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "banner",
  description: "Edit bot's banner",
  permissions: "ADMINISTRATOR", 
  options: [], 
  run: async (client, interaction) => {
    try {
      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
      }

      const newBannerUrl = "https://th.bing.com/th/id/R.ab725b695c69250819b333f1fff4bd37?rik=PLaxpYNfjQl6OQ&pid=ImgRaw&r=0"; // Provided banner URL

      await client.user.setBanner(newBannerUrl); // Update the banner

      // Create an embed to send a confirmation message
      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Banner Updated")
        .setDescription("The bot's banner has been successfully updated.")
        .setImage(newBannerUrl);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("Error updating banner:", error);
      await interaction.reply({ content: "An error occurred while updating the banner.", ephemeral: true });
    }
  },
};
