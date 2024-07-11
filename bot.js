const { exec } = require('child_process');
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { printWatermark } = require('./util/pw');
const config = require("./config.js");
const fs = require("fs");
const path = require('path');

// Install required npm packages
exec('npm install distube@latest @distube/spotify@latest @distube/soundcloud@latest @distube/deezer@latest @distube/yt-dlp@latest discord.js mongoose express', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing npm packages: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`npm stderr: ${stderr}`);
    return;
  }
  console.log(`npm stdout: ${stdout}`);

  // Initialize the bot after dependencies are installed
  const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a) => {
      return GatewayIntentBits[a];
    }),
  });

  client.config = config;
  client.player = new DisTube(client, {
    leaveOnStop: config.opt.voiceConfig.leaveOnStop,
    leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
    leaveOnEmpty: config.opt.voiceConfig.leaveOnEmpty.status,
    emitNewSongOnly: false, // Change this to false to emit all song events
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

  // Set the maximum number of listeners to avoid warnings
  player.setMaxListeners(30);

  // Add logging for player errors
  player.on('error', (channel, error) => {
    console.error(`Error in channel ${channel.id}: ${error.message}`);
  });

  // Add logging for other player events
  player.on('playSong', (queue, song) => {
    console.log(`Playing ${song.name} in ${queue.voiceChannel.name}`);
  });

  player.on('addSong', (queue, song) => {
    console.log(`Added ${song.name} to the queue in ${queue.voiceChannel.name}`);
  });

  fs.readdir("./events", (_err, files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0]; 
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });
  fs.readdir("./events/player", (_err, files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const player_events = require(`./events/player/${file}`);
      let playerName = file.split(".")[0];
      player.on(playerName, player_events.bind(null, client));
      delete require.cache[require.resolve(`./events/player/${file}`)];
    });
  });

  client.commands = [];
  fs.readdir(config.commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async (f) => {
      try {
        if (f.endsWith(".js")) {
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

  if(config.mongodbURL || process.env.MONGO){
    const mongoose = require("mongoose")
    mongoose.connect(config.mongodbURL || process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(async () => {
      console.log('\x1b[32m%s\x1b[0m', `|    🍔 Connected MongoDB!`)
    }).catch((err) => {
      console.log('\x1b[32m%s\x1b[0m', `|    🍔 Failed to connect MongoDB!`)})
    } else {
    console.log('\x1b[32m%s\x1b[0m', `|    🍔 Error MongoDB!`)
    }

  const express = require("express");
  const app = express();
  const port = 3000;
  app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'index.html');
    res.sendFile(imagePath);
  });
  app.listen(port, () => {
    console.log(`🔗 Listening to GlaceYT: http://localhost:${port}`);
  });
  printWatermark();
});
