const db = require('../mongoDB');

module.exports = {
  name: 'bot-status',
  description: 'Get information about the bot status.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const message = '𝐌𝐮𝐬𝐢𝐜 𝐁𝐨𝐭 status: **Working Well**';

      interaction.reply(message).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
