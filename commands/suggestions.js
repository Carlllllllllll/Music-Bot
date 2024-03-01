const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Suggestion = require('suggestionSchema.js');

const CHANNEL_ID = 'Your_Channel_id';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggestionbot')
    .setDescription('Suggest a new feature or improvement for the server')
    .addStringOption(option =>
      option.setName('suggestion')
        .setDescription('Your suggestion')
        .setRequired(true)
    ),
  async execute(interaction) {
    const suggestion = interaction.options.getString('suggestion');
    const dmChannel = await interaction.user.createDM();

    const suggestionDoc = new Suggestion({
      guildId: interaction.guild.id,
      channelId: CHANNEL_ID,
      userId: interaction.user.id,
      suggestion,
    });

    await suggestionDoc.save();

    const embed = new EmbedBuilder()
      .setColor("#6eff5f")
      .setTitle("👍 Suggestion Received!")
      .setDescription(
        `Thanks for your suggestion! It has been recorded and will be reviewed by the staff soon.\n\n**Suggestion:** ${suggestion}`
      )
      .setFooter({ text: `Suggestion ID: ${suggestionDoc._id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });

    const message = await interaction.client.channels.cache.get(CHANNEL_ID).send({
      content: `New suggestion from <@${interaction.user.id}>`,
      embeds: [new EmbedBuilder()
        .setColor("#ffdd00")
        .setTitle("📢 New Suggestion")
        .setDescription(suggestion)
        .setFooter({ text: `Suggestion ID: ${suggestionDoc._id}` })
        .setTimestamp(),
      ],
    });

    if (message.embeds[0].title === "📢 New Suggestion") {
      const approveButton = new ButtonBuilder()
        .setCustomId('approve')
        .setLabel('Approve')
        .setStyle(ButtonStyle.Success);

      const denyButton = new ButtonBuilder()
        .setCustomId('deny')
        .setLabel('Deny')
        .setStyle(ButtonStyle.Danger);

      const actionRow = new ActionRowBuilder()
        .addComponents(approveButton, denyButton);

      message.edit({ components: [actionRow] });

      const filter = (i) => i.customId === 'approve' || i.customId === 'deny';
      const collector = message.createMessageComponentCollector({ filter, time: 600000 });

      collector.on('collect', async (interaction) => {
        if (interaction.user.id !== interaction.user.id) {
          await interaction.reply({ content: "You cannot interact with this button.", ephemeral: true });
          return;
        }

        if (interaction.customId === 'approve') {
          await Suggestion.findOneAndUpdate({ _id: suggestionDoc._id }, { $set: { status: 'approved' } });
          const approvedEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("👏 Suggestion Approved!")
            .setDescription(
              `Your suggestion has been approved and will be considered for implementation.\n\n**Suggestion:** ${suggestion}`
            )
            .setFooter({ text: `Suggestion ID: ${suggestionDoc._id}` })
            .setTimestamp();

          await dmChannel.send({ embeds: [approvedEmbed] });
        } else if (interaction.customId === "deny") {
          await Suggestion.findOneAndUpdate(
            { _id: suggestionDoc._id },
            { $set: { status: "denied" } }
          );
          const deniedEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("😢 Suggestion Denied!")
            .setDescription(`Your suggestion has been denied.\n\n**Suggestion:** ${suggestion}`)
            .setFooter({ text: `Suggestion ID: ${suggestionDoc._id}` })
            .setTimestamp();
          await dmChannel.send({ embeds: [deniedEmbed] });
        }

        interaction.reply({ content: "Your selection has been recorded.", ephemeral: true });
        collector.stop();
      });

      collector.on('end', async () => {
        const finalStatus = await Suggestion.findOne({ _id: suggestionDoc._id }).select('status').lean();
        if (finalStatus.status === 'pending') {
          await Suggestion.findOneAndUpdate({ _id: suggestionDoc._id }, { $set: { status: 'expired' } });
          const expiredEmbed = new EmbedBuilder()
            .setColor("#ff8c00")
            .setTitle("⏰ Suggestion Expired!")
            .setDescription(
              `Your suggestion has expired after 10 minutes without enough reactions.\n\n**Suggestion:** ${suggestion}`
            )
            .setFooter({ text: `Suggestion ID: ${suggestionDoc._id}` })
            .setTimestamp();
          await interaction.followUp({ embeds: [expiredEmbed] });
        }
      });
    }
  },
};
