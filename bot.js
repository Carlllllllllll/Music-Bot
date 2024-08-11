process.env.YTDL_NO_UPDATE = '1';
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { DeezerPlugin } = require('@distube/deezer');
const { DirectLinkPlugin } = require('@distube/direct-link');

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
client.config = config;

// Load Commands
fs.readdirSync('./commands').forEach(file => {
    try {
        const command = require(`./commands/${file}`);
        if (!command.data || !command.data.name) {
            throw new Error(`Command in file ${file} is missing a 'data.name' property.`);
        }
        client.commands.set(command.data.name, command);
    } catch (error) {
        console.error(`Failed to load command in file ${file}: ${error.message}`);
    }
});

// Load Events
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
    try {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];

        if (typeof event === 'function') {
            client.on(eventName, event.bind(null, client));
        } else {
            console.error(`Event handler in ${file} is not a function.`);
        }
    } catch (error) {
        console.error(`Failed to load event in file ${file}: ${error.message}`);
    }
});

// Initialize DisTube with plugins
client.distube = new DisTube(client, {
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new DeezerPlugin(),
        new DirectLinkPlugin(),
        new YtDlpPlugin(),
    ],
    emitNewSongOnly: true,
    savePreviousSongs: true,
    nsfw: false,
});

// Load DisTube events
require('./events/distubeEvents')(client);

// Express server for web interface
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'index.html');
    res.sendFile(imagePath);
});

app.listen(port, () => {
    console.log(`🔗 Listening to GlaceYT : http://localhost:${port}`);
});

// Login to Discord
client.login(process.env.TOKEN);

module.exports = client;
