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

      // URL to the new profile picture
      const newPfpUrl = "https://media.discordapp.net/attachments/1208810080426795061/1271602484061671424/Gido-PFP-Carl.gif?ex=66b9e9d9&is=66b89859&hm=435b9550427e5f05bbff780e509e83170057b9f576f2380b672826c6b346c801&=";

      // Set the bot's avatar (profile picture)
      await client.user.setAvatar(newPfpUrl);

      // Create an embed to send a confirmation message
      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Profile Picture Updated")
        .setDescription("The bot's profile picture has been successfully updated.")
        .setImage(newPfpUrl);

      // Send the confirmation message
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("An error occurred while updating the profile picture:", error);
      await interaction.reply({ content: "An error occurred while updating the profile picture.", ephemeral: true });
    }
  },
};
