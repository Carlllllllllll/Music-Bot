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

      
      const newPfpUrl = "https://media.discordapp.net/attachments/1232589211547340871/1236308899666329661/standard.gif?ex=663789e3&is=66363863&hm=d8f1dffebc390d104ec8bb7ed4f7e28d82cb21fd7f47085f3d90b6a6fc9a97ef&=";

     
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
