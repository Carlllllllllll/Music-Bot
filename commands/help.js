const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "help",
  description: "Get information about the bot and commands.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
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
          { name: '🔀 Shuffle', value: 'Shuffle the songs in queue' },
          { name: '🎹 Playlist Add Music', value: 'To add songs to your playlist' },
          { name: '🎵 play Song Playlist', value: 'To play the current playlist' },
          { name: '🎼 Playlist Delete', value: 'To delete a playlist' },
          { name: '🎷 Playlist Delete Music', value: 'To delete a specific music in your playlist' },
          { name: '🎻 Playlist List', value: 'To see all songs in a specific playlist' },
          { name: '🎶 Playlist Lists', value: 'To see all playlists' },
          { name: 'ℹ️ Bot Info ', value: 'To know more info about the bot' },
          { name: '💡 Help us ', value: 'Help our team' },
          { name: '🔧 Updates ', value: 'To know about the bot updates' },
          { name: '🤖 Support ', value: 'To get our support links' },
          { name: '🎵 Recommended Playlists ', value: 'Some playlists will let you dance' },
          { name: '👑 About Owner', value: 'Hello, I am Carl. I am here to help 24/7. If there are any bugs or if you have any questions, do not hesitate to DM me. For more information about me, type /about-owner in any channel.' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177`);

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Basic Commands**')
        .addFields(
          { name: '🗑️ Clear', value: 'Clear the song queue of this server' },
          { name: '⏱️ Time', value: 'Display the current song playback time' },
          { name: '🎧 Filter', value: 'Apply filters to enhance the sound as you love' },
          { name: '🎵 Now Playing', value: 'Display the currently playing song' }
        )
        .setImage(`https://media1.tenor.com/m/ZDOGDzRbv08AAAAd/naruto-pain.gif`);

      // Send both sets of commands in separate embeds
      interaction.reply({ embeds: [musicCommandsEmbed, basicCommandsEmbed] });
    } catch (error) {
      console.error('Error in the help command:', error);
    }
  },
};
