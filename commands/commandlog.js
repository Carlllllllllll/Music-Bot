const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const sendGuildId = '1145935264171180144';
    const sendChannelId = '1211330120921513984';

    const sendGuild = await client.guilds.fetch(sendGuildId);
    const sendChannel = await sendGuild.channels.fetch(sendChannelId);

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
      .setCustomID(`generateInvitelog`)
      .setLabel(`Generate Invite Link`)
      .setDisabled(false);

    const buttons = new ActionRowBuilder()
      .addComponents(button);

    let msg;

    try {
      msg = await sendChannel.send({ embeds: [embed], components: [buttons] });
    } catch (error) {
      console.error("Error sending interaction log message:", error);
      return;
    }

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.BUTTON,
      time: 300000, // Adjusted time to a reasonable value
    });

    collector.on("collect", async (i) => {
      if (i.customID == 'generateInvitelog') {
        const invite = await channel.createInvite();
        await i.reply({ content: `Here is the invite to the guild for command use: https://discord.gg/${invite.code}` });
      }
    });
  }
};
