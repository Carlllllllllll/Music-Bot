const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '/'; // Your bot's command prefix

client.on('message', (message) => {
    // Ignore messages from bots and those not starting with the prefix
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    // Extract the command and arguments from the message
    const [command, ...args] = message.content.slice(prefix.length).split(' ');

    // Your command handling logic goes here
    if (command === 'yourCommand') {
        // Execute your command
        // ...

        // Log the command details
        const commandDetails = {
            user: message.author.username,
            command: command,
            arguments: args,
            // Add any other relevant data
        };

        const logChannelId = '1191002211635970128'; // Replace with the ID of the channel where you want to log commands
        const logChannel = client.channels.cache.get(logChannelId);

        logChannel.send(`Command executed: ${JSON.stringify(commandDetails)}`);
    }
});

client.login('TOKEN');
