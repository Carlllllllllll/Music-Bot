const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {

    if (!interaction.commandName) return;

    const guildId = '1145935264171180144';
    const channelId = '1211330120921513984';

    const sendGuild = await client.guilds.fetch(guildId);
    const sendChannel = await sendGuild.channels.fetch(channelId);

    const command = interaction.commandName;
    const guild = interaction.guild;
    const user = interaction.user;
    const channel = interaction.channel;

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
      .setCustomID(`generateInviteLog`)
      .setLabel(`Generate Invite Link`)
      .setDisabled(false);

    const buttons = new ActionRowBuilder()
      .addComponents(button);

    const msg = await sendChannel.send({ embeds: [embed], components: [buttons] });

    const time = 300000;  // Adjusted time to a reasonable value
    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.BUTTON,
      time
    });

    collector.on("collect", async (i) => {
      if (i.customID == 'generateInviteLog') {
        // Using deferReply to ensure the command doesn't fail due to potential API latency
        await i.deferReply();
        const invite = await channel.createInvite();
        await i.editReply({ content: `Here is the invite to the guild for command use: https://discord.gg/${invite.code}` });
      }
    });

    collector.on('end', async () => {
      button.setDisabled(true);
      embed.setFooter("Interaction Use Logger -- time ended");
      // Using deferReply and editReply instead of reply
      await interaction.deferReply();
      await interaction.editReply({ embeds: [embed], components: [buttons] });
    });
  }
};
