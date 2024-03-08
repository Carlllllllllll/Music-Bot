const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "pfp",
  description: "Edit bot's profile picture",
  permissions: "ADMINISTRATOR", 
  options: [], 
  run: async (client, interaction) => {
    try {

      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
      }


      const newPfpUrl = "data:image/jpeg;base64,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";


      await client.user.setAvatar(newPfpUrl);

      // Create an embed to send a confirmation message
      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Profile Picture Updated")
        .setDescription("The bot's profile picture has been successfully updated.")
        .setImage(newPfpUrl);


      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      await interaction.reply({ content: "An error occurred while updating the profile picture.", ephemeral: true });
    }
  },
};
