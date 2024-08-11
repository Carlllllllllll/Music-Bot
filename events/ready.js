const { REST, Routes, ActivityType } = require('discord.js');
const fs = require('fs');
const config = require('../config'); // Ensure this config file contains your necessary configurations
const status = "AUTOMATIC";
const botName = "Music Bot [ Distube ]";
const Text = "GlaceYT";
const version = "Latest@ v4.0"; 
const startTime = Date.now();

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
    
    // Check if the command has a valid data structure
    if (command.data && command.data.toJSON) {
      commands.push(command.data.toJSON());
    } else {
      console.error(`Command in file ${file} is missing a 'data' property or 'toJSON' method.`);
    }
  });

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('Commands registered successfully.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }

  // Set the bot's activity
  client.user.setActivity('Netflix', {
    type: ActivityType.Watching,
  });
};
