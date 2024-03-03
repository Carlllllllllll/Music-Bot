const { EmbedBuilder } = require('discord.js');
const db = require('../mongoDB');
const moment = require('moment');

module.exports = {
  name: 'bot-info',
  description: 'Get information about the bot.',
  permissions: '0x0000000000000800',
  options: [],

  run: async (client, interaction) => {
    try {
      const supportServerLink = 'https://discord.gg/XuvB8URUez';

      const uptimeStart = moment('2024-03-03T10:45:00'); // Set the start time of your bot

      const currentTime = moment();
      const uptimeDuration = moment.duration(currentTime.diff(uptimeStart));

      const days = uptimeDuration.days();
      const hours = uptimeDuration.hours();
      const minutes = uptimeDuration.minutes();
      const seconds = uptimeDuration.seconds();

      const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setAuthor({
          name: 'Bot Info',
        })
        .setDescription(`Bot Developers: **Carl (Owner)**
Bot Version: **1.2.0**
Bot System: **Music System**
This bot was created on **01/16/2024**.
Bot Status: Online since **03/03/2024** **Since the last reboot**.
Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s
Commands Count: **30**
Commands Status: **Working**
`)
        .setTimestamp();

      interaction.reply({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  },
};
