const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {

    if (!interaction.commandName) return;

    var sendGuild = await client.guilds.fetch('1145935264171180144');
    var sendChannel = await sendGuild.channels.fetch('1211330120921513984');

    var command = interaction.commandName;
    var guild = interaction.guild;
    var user = interaction.user;
    var channel = interaction.channel;

    const embed = EmbedBuilder()
      .setColor("Green")
      .setTitle('✅ Command Used')
      .setDescription('An interaction command has been used')
      .addField("Command", `\`${command}\``)
      .addField("Guild Of Use", `\`${guild.name}\` (${guild.id})`)
      .addField("Channel Of Use", `\`${channel.name}\` (${channel.id})`)
      .addField("Command User", `\`${user.username}\` (${user.id})`)
      .setFooter('Interaction Use Logger')
      .setTimestamp();

    const button = new ButtonBuilder()
      .setStyle(ButtonStyle.danger)
      .setCustomID(`generateInvitelog`)
      .setLabel(`Generate Invite Link`)
      .setDisabled(false);

    const buttons = new ActionRowBuilder()
      .addComponents(button);

    var msg = await sendChannel.send({ embeds: [embed], components: [buttons] });

    var time = 300000;  // Adjusted time to a reasonable value
    const collector = await msg.createMessageComponentCollector({
      componentType: ComponentType.BUTTON,
      time
    });

    collector.on("collect", async (i) => {
      if (i.customID == 'generateInvitelog') {
        var invite = await channel.createInvite();
        await i.reply({ content: `Here is the invite to the guild for command use: https://discord.gg/${invite.code}` });
      }
    });

    collector.on('end', async () => {
      button.setDisabled(true);
      embed.setFooter("Interaction Use Logger -- time ended");
      await msg.edit({ embeds: [embed], components: [buttons] });
    });
  }
};
