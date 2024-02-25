module.exports = {
  TOKEN: "",
  ownerID: ["1126336222206365696", ""],
  botInvite: "",
  supportServer: "",
  mongodbURL: "mongodb+srv://Carl:clNTBxAyg7uK6nwh@clownsbot.8nqmclk.mongodb.net/?retryWrites=true&w=majority",
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
      leaveOnStop: false,
      leaveOnEmpty: {
        status: false,
        cooldown: 10000000000000000000,
      },

    },

    maxVol: 200,

  }
}
