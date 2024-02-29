// Import necessary modules
const { Client, GatewayIntentBits, MessageActionRow, MessageButton } = require('discord.js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

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
    // Your existing code for fetching and processing suggestions

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
    client.on('interactionCreate', async (interaction) => {
      // Your existing code for handling button clicks
      if (!interaction.isButton()) return;

      const [action, suggestionId] = interaction.customId.split('_');
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

      // Disable the button after it is clicked
      interaction.deferUpdate();
    });
  }
});

// Log in to Discord
client.login(process.env.TOKEN);
