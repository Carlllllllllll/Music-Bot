const { REST, Routes, ActivityType, DataResolver } = require('discord.js'); // Importing required modules
const fs = require('fs');
const status = "AUTOMATIC";
const botName = "Music Bot [ Distube ]";
const Text = "GlaceYT";
const version = "Latest@ v4.0"; 
const startTime = Date.now();
const config = require('../config');

// Function to print the bot's watermark in the console
function printWatermark() {
  const uptimeInSeconds = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\x1b[1m\x1b[36m╔════════════════════════════════════════════╗');
  console.log('\x1b[1m\x1b[36m║                                            ║');
  console.log(`\x1b[1m\x1b[36m            ${botName}     `);
  console.log(`\x1b[1m\x1b[36m            👑 Authorization : ${status}    `);
  console.log(`\x1b[1m\x1b[36m            💡 Version: ${version}`);
  console.log(`\x1b[1m\x1b[36m            📅 Uptime: ${uptimeInSeconds}s`);
  console.log(`\x1b[1m\x1b[36m            🚀 Powered by ${Text}`);
  console.log('\x1b[1m\x1b[36m║                                            ║');
  console.log('\x1b[1m\x1b[36m╚════════════════════════════════════════════╝\x1b[0m');
}
printWatermark();

module.exports = async (client) => {
  console.log(`\x1b[31m[ CORE ]\x1b[0m \x1b[32mBot Name:  \x1b[0m${client.user.tag}`);
  console.log(`\x1b[31m[ CORE ]\x1b[0m \x1b[32mClient ID: \x1b[0m${client.user.id}`);
  
  const commands = [];
  fs.readdirSync('./commands').forEach(file => {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
  });

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands },
  );

  // Set the bot's activity
  client.user.setActivity('Netflix', {
    type: ActivityType.Watching,
  });

  // Update the bot's banner
  try {
    const bannerUrl = "https://media.discordapp.net/attachments/1208810080426795061/1271602484519112724/Gido-Banner-Carl.gif?ex=66b9e9d9&is=66b89859&hm=36cef24fa243affd09339b811aff865f0169dd29cd64b453724963d13e4941e8&="; // Add the URL for the new banner

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
};
