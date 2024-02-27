module.exports = {
  TOKEN: "",
  ownerID: ["1126336222206365696", ""],
  botInvite: "",
  supportServer: "",
  mongodbURL: "mongodb+srv://Carl:eMIRJ0Rg1VmIgJOD@clownsbot.8nqmclk.mongodb.net/?retryWrites=true&w=majority&appName=ClownsBot",
  status: 'Carl GG',
  commandsDir: './commands',
  language: "en",
  embedColor: "00fbff",
  errorLog: "",


  sponsor: {
    status: true,
    url: "https://discordapp.com/users/1126336222206365696",
  },

  voteManager: {
    status: false,
    api_key: "",
    vote_commands: ["back", "channel", "clear", "dj", "filter", "loop", "nowplaying", "pause", "playnormal", "playlist", "queue", "resume", "save", "play", "skip", "stop", "time", "volume"],
    vote_url: "",
  },

  shardManager: {
    shardStatus: false
  },

  playlistSettings: {
    maxPlaylist: 15,
    maxMusic: 300,
  },

  opt: {
    DJ: {
      commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume', 'shuffle']
    },

    voiceConfig: {
      leaveOnFinish: false,
      leaveOnStop: true,
      leaveOnEmpty: {
        status: true,
        cooldown: 1000,
      },

    },

    maxVol: 200,

  }
}
module.exports = {
    client: {
        token: '', // ← Your bot token (.env IS RECOMMENDED)
        id: '1200206489260933232' // ← Your bot ID
    },
    modmail: {
        guildId: '1145935264171180144', // ← Your server ID
        categoryId: '1212084660042211459', // ← The modmail category ID
        staffRoles: ['1187856441973952603'], // ← The modmail staff roles IDs
        mentionStaffRolesOnNewMail: true // ← Mention staff roles when there is a new mail?
    },
    logs: {
        webhookURL: '' // ← The logging webhook URL (OPTIONAL) (.env IS RECOMMENDED)
    }
};
