// Import necessary modules
const { Client, GatewayIntentBits } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
require('dotenv').config();

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.MessageContent,
  ],
});

// Register buttons with the client
require('discord-buttons')(client);

// Event handler when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event handler for message creation
client.on('messageCreate', async (message) => {
  // Ignore messages from other bots
  if (message.author.bot) return;

  // Check if the command is invoked
  if (message.content.startsWith('/suggestions')) {
    // Get suggestions from the specified channel in the specified server
    const suggestionsChannel = client.guilds.cache.get('1145935264171180144')?.channels.cache.get('1212847030561677342');

    if (!suggestionsChannel) {
      return console.error('Invalid server or channel IDs provided.');
    }

    // Fetch suggestions messages
    const messages = await suggestionsChannel.messages.fetch();

    // Check if there are any suggestions
    if (messages.size === 0) {
      return message.reply('No suggestions found.');
    }

    // Create buttons for each suggestion
    const buttons = messages.map((suggestion) => {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`accept_${suggestion.id}`)
            .setLabel('Accept')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setCustomId(`decline_${suggestion.id}`)
            .setLabel('Decline')
            .setStyle('DANGER'),
        );
      return { suggestion, row };
    });

    // Send the suggestions with buttons
    await message.reply({
      content: 'Here are the suggestions:',
      components: buttons.map((button) => button.row),
    });

    // Set up button interaction event
    client.on('clickButton', async (button) => {
      // Check if the button was clicked in the correct channel
      if (button.channel.id === message.channel.id) {
        // Process the button click
        const [action, suggestionId] = button.id.split('_');
        const suggestion = buttons.find((btn) => btn.suggestion.id === suggestionId);

        if (action === 'accept') {
          // Handle the accepted suggestion
          // Send DM to the user who sent the suggestion
          const user = await client.users.fetch(suggestion.suggestion.author.id);
          await user.send('Your suggestion was accepted!');
        } else if (action === 'decline') {
          // Handle the declined suggestion
          // Send DM to the user who sent the suggestion
          const user = await client.users.fetch(suggestion.suggestion.author.id);
          await user.send('Your suggestion was declined.');
        }

        // Disable the buttons after they are clicked
        button.defer();
      }
    });
  }
});

// Log in to Discord
client.login(process.env.TOKEN);
