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

      
      const newPfpUrl = "https://www.bing.com/th/id/OGC.33a46f727dbe790d436616a1f56fce9c?pid=1.7&rurl=https%3a%2f%2fc.tenor.com%2flhlDEs5fNNEAAAAC%2fmusic-beat.gif&ehk=Q6VQ%2fljCF8E5c4SoMKS7WO0JVmawKSZeWjZRvoKZ7CY%3d";

     
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
