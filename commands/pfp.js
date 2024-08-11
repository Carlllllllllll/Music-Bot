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

      
      const newPfpUrl = "https://media.discordapp.net/attachments/1208810080426795061/1271602484061671424/Gido-PFP-Carl.gif?ex=66b9e9d9&is=66b89859&hm=435b9550427e5f05bbff780e509e83170057b9f576f2380b672826c6b346c801&=";

     
      await client.user.setBanner(newPfpUrl);

      // Create an embed to send a confirmation message
      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Banner is now Updated")
        .setDescription("The bot's banner has been successfully updated.")
        .setImage(newPfpUrl);

    
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("An error while adding the banner:", error);
      await interaction.reply({ content: "An error occurred while updating the banner", ephemeral: true });
    }
  },
};
