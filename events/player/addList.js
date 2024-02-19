const { MessageEmbed } = require("discord.js");
const db = require("../../mongoDB");

module.exports = async (client, queue, playlist) => {
    try {
        const embed = new MessageEmbed()
            .setDescription(`Hello 🛠️ Please bear with us as the bot is still in development. This is the first version, and this command is on the future features list. No worries, the owner is currently updating me. I will send a message when this command has been completed. 🚀`)
            .addField(`${playlist.user.id}`, `\`${playlist.name} (${playlist.songs.length} 
            .setImage("https://media1.tenor.com/m/B7_W48WYpuoAAAAC/10.gif");

        const sentMessage = await queue.textChannel.send({ embeds: [embed] });
        console.log("Message Sent:", sentMessage.content); // Log the content of the sent message
    } catch (error) {
        console.error("Error:", error);
    }
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
