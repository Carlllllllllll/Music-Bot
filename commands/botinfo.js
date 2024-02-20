const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('messageCreate', (message) => {
    if (message.content.toLowerCase() === '/bot info') {
        // Replace 'YOUR_SUPPORT_SERVER_INVITE' with your actual support server invite link
        const supportServerInvite = 'https://discord.gg/e7HaQ2p9n2';

        // Create an embed with a GIF image above the footer
        const embed = new MessageEmbed()
            .setTitle('Bot Information')
            .setThumbnail(message.guild.iconURL())
            .setDescription(`Hello! 🎵 I'm Music Bot, and I have a deep love for music. Carl brought me to life, but as this is my first version, I might have a few bugs and quirks. No worries, though – Carl is here to help! 🤖✨\n\nJoin our support server for swift assistance and a musical journey together! 🎶🚀\n\n[Join our support server here](${supportServerInvite})`)
            .setImage('https://media1.tenor.com/m/WI5z7d934jIAAAAC/naruto-smile.gif') // Set image directly
            .setFooter('More info - Use /help command │ Made By 𝑪𝒂𝒓𝒍 ⚡');

        // Send the embed to the same channel where the command was used
        message.channel.send({ embeds: [embed] });
    }
});

// No login here

// You can choose when and where to log in the bot, based on your application's logic
// client.login(botToken);
