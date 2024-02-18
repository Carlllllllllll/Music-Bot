run: async (client, interaction) => {
  try {
    const combinedCommandsEmbed = new EmbedBuilder()
      .setColor(client.config.embedColor)
      .setTitle('🎸 **Music Commands**')
      .addFields(
        { name: '🎹 Play', value: 'Stream a song from a given link or text from sources' },
        { name: '⏹️ Stop', value: 'Makes the bot stop playing music and leave the voice' },
        { name: '📊 Queue', value: 'View and manage the song queue of this server' },
        { name: '⏭️ Skip', value: 'Skip the current playing song' },
        { name: '⏸️ Pause', value: 'Pause the currently playing song' },
        { name: '▶️ Resume', value: 'Resume the current paused song' },
        { name: '🔁 Loop', value: 'Toggle loop mode for queue and current song' },
        { name: '🔄 Autoplay', value: 'Enable or disable autoplay [play random songs ]' },
        { name: '⏩ Seek', value: 'Seek to a specific time in the current song' },
        { name: '⏮️ Previous', value: 'Play the previous song in the queue' },
        { name: '🔀 Shuffle', value: 'Shuffle the songs in queue' }
      )
      .addField('\u200B', '\u200B') 
      .setTitle('✨ **Basic Commands**')
      .addFields(
        { name: '🏓 Ping', value: "Check the bot's latency" },
        { name: '🗑️ Clear', value: 'Clear the song queue of this server' },
        { name: '⏱️ Time', value: 'Display the current song playback time' },
        { name: '🎧 Filter', value: 'Apply filters to enhance the sound as you love' },
        { name: '🎵 Now Playing', value: 'Display the currently playing song information' },
        { name: '🔊 Volume', value: 'Adjust the music volume [ hearing at high volumes is risky ]' }
      )
      .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`)
      .setImage('https://media.discordapp.net/attachments/1187377061959045181/1207054115981500476/abef7c502876f45674d021230c4ea689.jpg?ex=65de3fbf&is=65cbcabf&hm=625106b29f760af166dce75db79cd689071a581094f0d66a7a3f25a36f49dd8c&');

    const button1 = new ButtonBuilder()
      .setLabel('YouTube')
      .setURL('https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A')
      .setStyle(ButtonStyle.Link);

    const button2 = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://discord.gg/')
      .setStyle(ButtonStyle.Link);

    const button3 = new ButtonBuilder()
      .setLabel('Code')
      .setURL('https://replit.com/@BEASTGAMERS')
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(button1, button2, button3);

    interaction.reply({
      embeds: [combinedCommandsEmbed],
      components: [row]
    }).catch(e => {});
  } catch (e) {
    console.error(e);
  }
},

