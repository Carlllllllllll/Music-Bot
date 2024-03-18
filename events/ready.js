const config = require("../config.js");
const { ActivityType } = require("discord.js");
const { Client, Intents, DataResolver } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

module.exports = async (client) => {
  if (config.mongodbURL || process.env.MONGO) {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: await client.commands,
        });
        console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Loaded!')
      } catch (err) {
        console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Distracted!');
      }
    })();

    console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);

    setInterval(() => client.user.setActivity({
      name: `Music 🎶`,
      type: ActivityType.Listening
    }), 4000);
    setInterval(() => client.user.setActivity({
      name: `Your Vibe 🎶`,
      type: ActivityType.Listening
    }), 4000);
    setInterval(() => client.user.setActivity({
      name: `Your Queue 🎶`,
      type: ActivityType.Watching
    }), 4000);
    setInterval(() => {
      const serverCount = client.guilds.cache.size;
      const memberCount = client.users.cache.size;

      client.user.setActivity({
        name: `Servers: ${serverCount} | Members: ${memberCount}`,
        type: ActivityType.Watching
      });
    }, 4000);

    client.errorLog = config.errorLog;
  } else {
    console.log('\x1b[36m%s\x1b[0m', `|    🍔 Error MongoDB!`);
  }

  console.log('\x1b[36m%s\x1b[0m', `|    🎯 Activity successfully set!`);

  if (client.config.voteManager.status === true && client.config.voteManager.api_key) {
    const { AutoPoster } = require('topgg-autoposter');
    const ap = AutoPoster(client.config.voteManager.api_key, client);
    ap.on('posted', () => {
    });
  }

  // Update the bot's banner
  try {
    const bannerUrl = "https://th.bing.com/th/id/R.fc4f45f89d3de367b4601a467cc9c166?rik=r8AiECSlQ%2ftWLw&riu=http%3a%2f%2fwww.galesaur.com%2fmusic%2f00-10.gif&ehk=3scZcznrIZpQeYBEZfWL69uR7A3SREZbsD7jOFswdSM%3d&risl=&pid=ImgRaw&r=0"; // Add the URL for the new banner

    // Resolve the banner URL to an image
    const resolvedBanner = await DataResolver.resolveImage(bannerUrl);

    // Patch the user's banner using Discord API
    await client.rest.patch(Routes.user(), {
      body: { banner: resolvedBanner },
    });

    console.log('The banner was uploaded successfully!!');
  } catch (error) {
    console.error('Error when uploading the banner.', error);
  }

  // Log in to Discord with your bot token
  client.login('TOKEN');
};

