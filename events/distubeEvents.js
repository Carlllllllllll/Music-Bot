const { EmbedBuilder, ChannelType } = require('discord.js');
const musicIcons = require('../UI/icons/musicicons.js');
const messages = require('../languages/en.js'); // Ensure the path is correct

module.exports = (client) => {
  client.distube
    .on('playSong', async (queue, song) => {
      if (!song || !queue.textChannel) {
        //console.error('No song or text channel information available');
        return;
      }

      try {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setAuthor({ 
            name: messages.playSong.authorName, 
            iconURL: musicIcons.playerIcon,
            url: messages.playSong.url
          })
          .setDescription(`- **${messages.playSong.song}**: ${song.name}\n- **${messages.playSong.duration}**: \`${song.formattedDuration}\`\n- **${messages.playSong.source}**: ${song.source}`)
          .setImage(song.thumbnail)
          .setTimestamp();

        if (queue.textChannel.isTextBased()) {
          await queue.textChannel.send({ embeds: [embed] });
        } else {
          //console.error('Invalid text channel:', queue.textChannel);
        }
      } catch (error) {
        //console.error('Failed to send message:', error);
      }
    })
    .on('addSong', async (queue, song) => {
      if (!song || !queue.textChannel) {
        //console.error('No song or text channel information available');
        return;
      }

      try {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setAuthor({ 
            name: messages.addSong.authorName, 
            iconURL: musicIcons.correctIcon,
            url: messages.addSong.url
          })
          .setDescription(`**${song.name}** - \`${song.formattedDuration}\` ${messages.addSong.addedToQueue}`)
          .setTimestamp();

        if (queue.textChannel.isTextBased()) {
          await queue.textChannel.send({ embeds: [embed] });
        } else {
          //console.error('Invalid text channel:', queue.textChannel);
        }
      } catch (error) {
        //console.error('Failed to send message:', error);
      }
    })
    .on('error', async (channel, error) => {
      try {
        if (!channel || channel.type !== ChannelType.GuildText) {
          console.error('Invalid or missing channel:', channel);
          return;
        }

        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setAuthor({ 
            name: messages.error.authorName, 
            iconURL: musicIcons.dotIcon,
            url: messages.error.url
          })
          .setDescription(`${messages.error.errorMessage}: ${error.message}`)
          .setTimestamp();

        await channel.send({ embeds: [embed] });
      } catch (err) {
        //console.error('Failed to send error message:', err);
      }
    })
    .on('finish', async (queue) => {
      if (!queue.textChannel) {
        //console.error('No text channel information available');
        return;
      }

      try {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setAuthor({ 
            name: messages.finish.authorName, 
            iconURL: musicIcons.beatsIcon,
            url: messages.finish.url
          })
          .setDescription(messages.finish.description)
          .setTimestamp();

        if (queue.textChannel.isTextBased()) {
          await queue.textChannel.send({ embeds: [embed] });
        } else {
          //console.error('Invalid text channel:', queue.textChannel);
        }
      } catch (error) {
        //console.error('Failed to send message:', error);
      }
    })
    .on('disconnect', async (queue) => {
      if (!queue.textChannel) {
        //console.error('No text channel information available');
        return;
      }

      try {
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setAuthor({ 
            name: messages.disconnect.authorName, 
            iconURL: musicIcons.stopIcon,
            url: messages.disconnect.url
          })
          .setDescription(messages.disconnect.description)
          .setTimestamp();

        if (queue.textChannel.isTextBased()) {
          await queue.textChannel.send({ embeds: [embed] });
        } else {
          //console.error('Invalid text channel:', queue.textChannel);
        }
      } catch (error) {
        //console.error('Failed to send message:', error);
      }
    })
    .on('empty', async (queue) => {
      if (!queue.textChannel) {
        //console.error('No text channel information available');
        return;
      }

      client.distube.on('error', async (channel, error) => {
        try {
         
            if (channel && channel.type === ChannelType.GuildText) {
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setAuthor({ 
                        name: messages.error.authorName, 
                        iconURL: musicIcons.dotIcon,
                        url: messages.error.url
                    })
                    .setDescription(`${messages.error.errorMessage}: ${error.message}`)
                    .setTimestamp();
    
                await channel.send({ embeds: [embed] });
            } else {
                // Handle other types of errors that are not channel-specific
                //console.error('Error:', error.message);
            }
    
            // Additional error-specific logic
            if (error.errorCode === 'FFMPEG_EXITED') {
                //console.warn('FFMPEG exited with code:', error.errorCode);
                // Implement any additional logic for this specific error
            }
        } catch (err) {
            // Handle any errors that occur during error handling
            //console.error('Failed to handle error:', err);
        }
    });
  });
};
