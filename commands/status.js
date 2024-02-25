const db = require('../mongoDB');

module.exports = {
  name: 'bot-status',
  description: 'Get information about the bot status.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const message = 'Bot status: **In Development**';

      interaction.reply(message).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
