const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "help",
  description: "Get information about the bot and commands.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const embedHeight = 400; // Set the desired height for the images
      const gifUrl = 'https://www.bing.com/ck/a?!&&p=82f9dc9d72783565JmltdHM9MTcwODEyODAwMCZpZ3U9TmV3JnNvdXJjZT01NTA3NA&ptn=3&ver=2&hsh=3&fclid=0c78d574-2ba3-6f7e-084a-c1682a7e6eb3&u=a1L2ltYWdlcy9zZWFyY2g_cT1wYWluIGdpZiBuYXJ1dG8mRk9STT1JUUZSQkEmaWQ9QjI4NDFGQzEyMUYxODQ2MjJGMDFFMzQxN0MxQTk3RTVFNjg4OEEwMw&ntb=1';

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
          { name: '👑 About Owner', value: 'Owner name is Carl. 24/7 Helping. For more info type /help in any channel' }
        )
        .setHeight(embedHeight); // Set the height for the image

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Basic Commands**')
        .addFields(
          { name: '🗑️ Clear', value: 'Clear the song queue of this server' },
          { name: '⏱️ Time', value: 'Display the current song playback time' },
          { name: '🎧 Filter', value: 'Apply filters to enhance the sound as you love' },
          { name: '🎵 Now Playing', value: 'Display the currently playing song' }
        )
        .setHeight(embedHeight); // Set the height for the image

      // Send both sets of commands in separate embeds along with the gif directly in the message content
      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        content: `Here's a cool gif: ${gifUrl}`,
      });
    } catch (error) {
      console.error('Error in the help command:', error);
    }
  },
};
