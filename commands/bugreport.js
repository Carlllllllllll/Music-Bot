const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
} = require("@discordjs/builders");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  TextInputStyle,
  Events,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report-bug")
    .setDescription("Report a bug that has been detected!"),

  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("reportbugmodal")
      .setTitle("Report a bug");

    const reportmodal = new TextInputBuilder()
      .setCustomId("reportbugmodal2")
      .setLabel("Report a bug!")
      .setStyle(TextInputStyle.Short);
    
    const commandmodal = new TextInputBuilder()
    .setCustomId("reportcommandmodal")
    .setLabel("What is the command that had the buggy code?")
    .setStyle(TextInputStyle.Short)

    const firstActionRow = new ActionRowBuilder().addComponents(reportmodal);
    const secondActionRow = new ActionRowBuilder().addComponents(commandmodal);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.customId === "reportbugmodal") {
        const bug = interaction.fields.getTextInputValue("reportbugmodal2");
        const command = interaction.fields.getTextInputValue("reportcommandmodal");
        const user = interaction.user
        const embed = new EmbedBuilder()
          .setTitle("Command Reported!")
          .setColor("Blue")
          .setDescription(`A command has been reported!`)
          .setImage("https://i.imgur.com/iBdxcV6.gif")
          .addFields(
            { name: `User`, value: `${user}`, inline: false },
            { name: `Bug`, value: `${bug}`, inline: false },
            { name: `Command`, value: `${command}`, inline: false },
          )
          .setTimestamp()
          .setThumbnail(await user.displayAvatarURL());
          await interaction.reply({content: `Report sent!`, ephemeral: true})
        const channelid = client.channels.cache.get("1191002211635970128");
        await channelid.send({ embeds: [embed] }).catch((err) => {
          return;
        });
      }
    });
  },
};
