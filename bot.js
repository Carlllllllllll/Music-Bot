const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { DeezerPlugin } = require('@distube/deezer');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { printWatermark } = require('./util/pw');
const config = require('./config.js');

const installPackages = (packages) => {
  return new Promise((resolve, reject) => {
    exec(`npm install ${packages.join(' ')} --force`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing npm packages: ${error.message}`);
      } else if (stderr) {
        reject(`npm stderr: ${stderr}`);
      } else {
        console.log(`npm stdout: ${stdout}`);
        resolve();
      }
    });
  });
};

const startBot = async () => {
  try {
    // Install packages in smaller groups
    await installPackages(['distube@5.0.2', '@distube/spotify@latest', '@distube/soundcloud@latest']);
    await installPackages(['@distube/deezer@latest', '@distube/yt-dlp@latest', 'discord.js']);
    await installPackages(['mongoose', 'express', 'discord-api-types']);

    const client = new Client({
      intents: Object.keys(GatewayIntentBits).map((a) => GatewayIntentBits[a]),
    });

    client.config = config;
    client.player = new DisTube(client, {
      leaveOnStop: config.opt.voiceConfig.leaveOnStop,
      leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
      leaveOnEmpty: config.opt.voiceConfig.leaveOnEmpty.status,
      emitNewSongOnly: false,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
        new DeezerPlugin(),
      ],
    });

    process.env.YTDL_NO_UPDATE = true;
    const player = client.player;

    player.setMaxListeners(30);

    player.on('error', (channel, error) => {
      console.error(`Error in channel ${channel.id}: ${error.message}`);
    });

    player.on('playSong', (queue, song) => {
      console.log(`Playing ${song.name} in ${queue.voiceChannel.name}`);
    });

    player.on('addSong', (queue, song) => {
      console.log(`Added ${song.name} to the queue in ${queue.voiceChannel.name}`);
    });

    fs.readdir('./events', (_err, files) => {
      files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
      });
    });

    fs.readdir('./events/player', (_err, files) => {
      files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const player_events = require(`./events/player/${file}`);
        let playerName = file.split('.')[0];
        player.on(playerName, player_events.bind(null, client));
        delete require.cache[require.resolve(`./events/player/${file}`)];
      });
    });

    client.commands = [];
    fs.readdir(config.commandsDir, (err, files) => {
      if (err) throw err;
      files.forEach(async (f) => {
        try {
          if (f.endsWith('.js')) {
            let props = require(`${config.commandsDir}/${f}`);
            client.commands.push({
              name: props.name,
              description: props.description,
              options: props.options,
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    });

    if (config.TOKEN || process.env.TOKEN) {
      client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
        console.log('TOKEN ERROR❌❌');
      });
    } else {
      setTimeout(() => {
        console.log('TOKEN ERROR❌❌');
      }, 2000);
    }

    if (config.mongodbURL || process.env.MONGO) {
      const mongoose = require('mongoose');
      mongoose.connect(config.mongodbURL || process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async () => {
        console.log('\x1b[32m%s\x1b[0m', '|    🍔 Connected MongoDB!');
      }).catch((err) => {
        console.log('\x1b[32m%s\x1b[0m', '|    🍔 Failed to connect MongoDB!');
      });
    } else {
      console.log('\x1b[32m%s\x1b[0m', '|    🍔 Error MongoDB!');
    }

    const express = require('express');
    const app = express();
    const port = 3000;
    app.get('/', (req, res) => {
      const indexPath = path.join(__dirname, 'index.html');
      res.sendFile(indexPath);
    });
    app.listen(port, () => {
      console.log(`🔗 Listening to GlaceYT: http://localhost:${port}`);
    });

    printWatermark();

  } catch (error) {
    console.error(error);
  }
};

startBot();
