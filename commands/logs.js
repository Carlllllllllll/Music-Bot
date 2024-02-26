const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {

    if (!interaction.commandName) return;

    var sendGuild = await client.guilds.fetch('1145935264171180144');
    var sendChannel = await client.sendGuilds.channels.fetch('1211330120921513984');

    var command = interaction.commandName;
    var guild = interaction.guild;
    var user = interaction.user;
    var channel = interaction.channel;

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle('✅ Command Used')
      .setDescription('An interaction command has been used')
      .addField({ name: "Command", value: `\`${command}\`` })
      .addField({ name: "Guild Of Use", value: `\`${guild.name}\` (${guild.id})`})
      .addField({ name: "Channel Of Use", value: `\`${channel.name}\` (${channel.id})`})
      .addField({ name:"Command User", value: `\`${user.username}\` (${user.id})`})
      .setFooter({ text: "Interaction Use Logger"})
      .setTimestamp();
    
  }
};
