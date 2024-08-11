const loadLanguage = require('../loadlanguage.js');

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    const lang = loadLanguage(); // Call loadLanguage as a function if it's not already
    await command.execute(interaction, client, lang);
  } catch (error) {
    console.error(error);
    const lang = loadLanguage(); // Call loadLanguage as a function if it's not already
    await interaction.reply({ content: lang.errorMessage || 'There was an error while executing this command!', ephemeral: true });
  }
};
