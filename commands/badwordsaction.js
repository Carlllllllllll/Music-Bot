const { Client, Intents } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const logsChannelId = '1191002211635970128'; // Replace this with your logs channel ID
const badWords = [
    'ass',
    'asshole',
    'bastard',
    'bitch',
    'cock',
    'cunt',
    'damn',
    'dick',
    'fuck',
    'motherfucker',
    'piss',
    'pussy',
    'shit',
    'slut',
    'whore',
    'nigger',
    'fag',
    'gay',
    'retard',
    'faggot',
    'spic',
    'dyke',
    'kike',
    'chink',
    'wetback',
    'twat',
    'bimbo',
    'jerkoff',
    'jackass',
    'douchebag',
    'scumbag',
    'cuck',
    'nazi',
    'klansman',
    'pedophile',
    'rape',
    'incest',
    'suicide',
    'terrorist',
    'abortion',
    'anorexia',
    'cocaine',
    'crack',
    'heroin',
    'meth',
    'weed',
    'alcohol',
    'cannabis',
    'weed',
    'ecstasy',
    'vodka',
    'beer',
    'cocaine',
    'porn',
    'sex',
    'sexual',
    'masturbate',
    'orgasm',
    'vagina',
    'penis',
    'erection',
    'orgy',
    'dildo',
    'vibrator',
    'condom',
    'prostitute',
    'escort',
    'sperm',
    'spermicide',
    'intercourse',
    'underage',
    'child',
    'pornography',
    'incest',
    'rape',
    'abuse',
    'beastiality',
    'nude',
    'naked',
    'stripper',
    'strip',
    'strip club',
    'escort',
    'strip poker',
    'sado-masochism',
    'felatio',
    'fetish',
    'pubic hair',
    'bondage',
    'anal',
    'orgasm',
    'threesome',
    'golden shower',
    'masturbation',
    'smegma',
    'vulva',
    'vaginal',
    'lubricant',
    'penetration',
    'erotic',
    'lust',
    'sexy',
    'kinky',
    'bukkake',
    'rimming',
    'vulgar',
    'dirty',
    'hardcore',
    'nasty',
    'dirty talk',
    'cybersex',
    'semen',
    'ejaculate',
    'ejaculation',
    'foreplay',
    'hand job',
    'blow job',
    'anal beads',
    'deep throat',
    'cock ring',
    'double penetration',
    'fisting',
    'nipple play',
    'nipple clamps',
    'strap-on',
    'spanking',
    'domination',
    'submission',
    'squirting',
    'teabagging',
    'voyeurism',
    'exhibitionism',
    'orgasmic',
    'fornicate',
    'fornication',
    'bitchy',
    'wanker',
    'cocksucker',
    'cum',
    'bukake',
    'bondage',
    'furries',
    'yiff',
    'loli',
    'shota',
    'underage',
    'cp',
    'lolicon',
    'shotacon',
    'rapeplay',
    'racism',
    'misogyny',
    'homophobia',
    'xenophobia',
    'hate speech',
    'harassment',
    'discrimination',
    'violence',
    'murder',
    'assassination',
    'genocide',
    'torture',
    'terrorism',
    'abuse',
    'suicide',
    'self-harm',
    'bullying',
    'extremism',
    'radicalization',
    'incitement',
    'hatred',
    'intolerance',
    'bigotry',
    'prejudice',
    'slavery',
    'lynching',
    'holocaust',
    'apartheid',
    'ethnic cleansing',
    'war crimes',
    'torture',
    'inhumane',
    'dehumanization',
    'humiliation',
    'oppression',
    'exploitation',
    'colonialism',
    'imperialism',
    'racist',
    'sexist',
    'homophobic',
    'transphobic',
    'xenophobic',
    'ableist',
    'islamophobic',
    'antisemitic',
];
 // Add your bad words list here

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    // Check if the message contains an invite link or bad words
    if (message.content.includes('discord.gg/') || containsBadWord(message.content)) {
        try {
            // Delete the message
            await message.delete();

            // Send a log message to the logs channel
            const logsChannel = message.guild.channels.cache.get(logsChannelId);
            if (logsChannel) {
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Message Deleted ❌')
                    .setDescription(`**User:** ${message.author.tag}\n**Channel:** ${message.channel}\n**Message Content:**\n${message.content}`)
                    .setTimestamp()
                    .build(); // Assuming .build() is the method to finalize the embed

                await logsChannel.send({ embeds: [embed] });
            }

            // Notify the user about the deletion
            await message.author.send('⚠️ Your message was deleted because it contained an invite link or inappropriate content.');

        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
});

client.login('YOUR_BOT_TOKEN'); // Replace 'YOUR_BOT_TOKEN' with your actual bot token

// Function to check if a message contains bad words
function containsBadWord(messageContent) {
    // Add your logic to check if the message contains bad words
    // For example:
    // return badWords.some(word => messageContent.toLowerCase().includes(word.toLowerCase()));
    return false; // Replace this with your actual logic
}
