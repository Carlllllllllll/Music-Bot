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

      const newBannerUrl = "https://th.bing.com/th/id/R.fc4f45f89d3de367b4601a467cc9c166?rik=r8AiECSlQ%2ftWLw&riu=http%3a%2f%2fwww.galesaur.com%2fmusic%2f00-10.gif&ehk=3scZcznrIZpQeYBEZfWL69uR7A3SREZbsD7jOFswdSM%3d&risl=&pid=ImgRaw&r=0"; // Provided banner URL

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
