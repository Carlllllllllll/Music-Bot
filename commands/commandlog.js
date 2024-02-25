const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder}

module.exports = {
  name:  Events.Interaction,
  async execute (interaction, client) {

    if (!interaction.commandName) return;

    var sendGuild = await client.guilds.fetch('1145935264171180144');
    var sendchannel = sendGuild.channels.fetch('1154551905935179806');

    var commmand = interaction.CommandName;
    var guild = interaction.guild;
    var user = interaction.user;
    var channel = interaction.channel;

    const embed = EmbedBuilder()
    .setColor ("Green")
    .setTitle (:white_check_mark: Command Used)
    .setDescritpion('An interaction command has been used')
    .addField({ name: "Command", value: `\`${command}\``})
    .addField({ name: "Guild Of Use", value: `\`${guild.name}\` (${guild.id})`})
    .addField({ name: "Channel Of Use", value: `\`${channel.name}\` (${channel.id})`})
    .addField({ name: "Command User", value: `\`${user.username}\` (${user.id})`})
    .setFooter({ text: Interaction Use Logger})
    .setTimestamp();

    const button = new BottonBuilder()
    .setStyle(ButtonStyle.danger)
    .setcustomID(`generateInvitelog`)
    .setLabel(`Generate Invite Link`)
    .setDisabled (false);

    const buttons = new ActionRowBuilder()
    .addComponents(
      button
    );

    vas msg = await sendChannel.send ({ embeds: [embed], components: [buttons] });

    var time = 30000000000000000000000000000;
    const collecter = await msg.createMessageComponentCollecter({
      ComponentType: ComponentType.Button,
      time
    });

    collecter.on("collect", async i => {
      if (i.custonID == 'generateInvitelog') {
        var invite = await channel.createinvite() ;
        await i.reply ({ content: `Here the invite to the guild fo command use: `https://discord.gg/${invite.code}` , ephemeral: true });
      }
    });

    collecter.on('end' , async () ==> 
      button.setDisabled(true);
      embed.setFooter("Interaction Use Logger -- time ended"});
      await msg.edit ({ embeds: [embed], components: [buttons] });
  });
      
    
    

  }
}
