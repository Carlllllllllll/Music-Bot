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
    const button = new ButtonBuilder()
      .setStyle(ButtonStyle.danger)
      .setCustomID(`generateInviteLog`)
      .setLabel(`Generate Sever Invite Link`)
      .setDisabled(false);

    const buttons = new ActionRowBuilder()
      .addComponents(
        button
      );

    var msg = await sendChannel.send({ embeds: [embed], components: [buttons] });

    var time = 300000;  // Adjusted time to a reasonable value
    const collector = await msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time
    });

    collector.on("collect", async i => {
      if (i.customId == 'generateInviteLog') {
         var invite = await channel.createInvite();
        await i.Reply({ content: `Here is the invite to the guild for command use: https://discord.gg/${invite.code}`, ephemeral: true });
      }    
  });

    collector.on('end', async () => {
      button.setDisabled(true);
      embed.setFooter({ text: "Interaction Use Logger -- time ended"});
      // Using deferReply and editReply instead of reply
      await interaction.msg.edit({ embeds: [embed], components: [buttons] });
   });
  }
};
     
    
    
