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


      const newPfpUrl = "https://th.bing.com/th/id/OIP.HE-X5O-nztJcC-Q0JrihawHaHa?pid=ImgDet&w=184&h=184&c=7";


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
