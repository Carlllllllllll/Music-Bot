// playlist.js

const fs = require('fs');

module.exports = {
  name: 'playlist',
  description: 'Create a new playlist or save a song to an existing playlist.',
  execute(message, args) {
    if (args[0] === 'create') {
      // Check if a playlist name is provided
      const playlistName = args.slice(1).join(' ');

      if (!playlistName) {
        return message.channel.send('Please provide a name for the playlist. Usage: `playlist create <playlistName>`');
      }

      // Your logic to create a playlist goes here
      // For now, let's just send a confirmation message
      return message.channel.send(`Playlist \`${playlistName}\` has been created.`);
    } else {
      // Assume it's the 'save' subcommand
      // Your 'save' command logic goes here
      // This example assumes the same 'save' logic as before

      const song = {
        title: 'Song Title', // Replace with the actual title of the current song
        url: 'Song URL', // Replace with the actual URL of the current song
      };

      // Load existing playlists or create a new one
      let playlists = {};
      try {
        playlists = require('../playlists.json');
      } catch (error) {
        console.error(error);
      }

      // Check if a playlist name is provided
      const playlistName = args.slice(1).join(' ');

      if (!playlistName) {
        return message.channel.send('Please provide a name for the playlist. Usage: `playlist create <playlistName>`');
      }

      // Add the song to the specified playlist
      if (!playlists[playlistName]) {
        playlists[playlistName] = [song];
      } else {
        playlists[playlistName].push(song);
      }

      // Save the updated playlists back to the file
      fs.writeFile('../playlists.json', JSON.stringify(playlists), (err) => {
        if (err) {
          console.error(err);
          return message.channel.send('An error occurred while saving the playlist.');
        }
        message.channel.send(`The song has been saved to the playlist: \`${playlistName}\`.`);
      });
    }
  },
};
