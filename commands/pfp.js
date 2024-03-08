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


      const newPfpUrl = "https://www.bing.com/ck/a?!&&p=826d36dc8925ff66JmltdHM9MTcwOTg1NjAwMCZpZ3VpZD0wYzc4ZDU3NC0yYmEzLTZmN2UtMDg0YS1jMTY4MmE3ZTZlYjMmaW5zaWQ9NTU1MQ&ptn=3&ver=2&hsh=3&fclid=0c78d574-2ba3-6f7e-084a-c1682a7e6eb3&u=a1L2ltYWdlcy9zZWFyY2g_cT1NdXNpYyUyMGxvZ28lMjBnaWYmRk9STT1JUUZSQkEmaWQ9QTA4RTk1NUI5MERCOTFDNjg3QkZFQ0MxMDczMzRFQTcyRjVEOTdGNA&ntb=1";


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
