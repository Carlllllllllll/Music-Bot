const db = require("../../mongoDB");
module.exports = async (client, queue, playlist) => {

    queue?.textChannel?.send({ 
        content: `Hello 🛠️ Please bear with us as the bot is still in development. This is the first version, and this command is on the future features list. No worries, the owner is currently updating me. I will send a message when this command has been completed. 🚀\n\n<@${playlist.user.id}>, \`${playlist.name} (${playlist.songs.length + " " + '❌'})\` ❌❌` 
    }).catch(e => { });
};

/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
