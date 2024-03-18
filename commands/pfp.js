  // Import necessary modules from Discord.js
const { Client, Routes, DataResolver } = require('discord.js');

// Create a new Discord client
const client = new Client();

// Function to update the banner
async function updateBanner() {
  try {
    const bannerUrl = "https://th.bing.com/th/id/R.fc4f45f89d3de367b4601a467cc9c166?rik=r8AiECSlQ%2ftWLw&riu=http%3a%2f%2fwww.galesaur.com%2fmusic%2f00-10.gif&ehk=3scZcznrIZpQeYBEZfWL69uR7A3SREZbsD7jOFswdSM%3d&risl=&pid=ImgRaw&r=0";
    const resolvedBanner = await DataResolver.resolveImage(bannerUrl);

    await client.rest.patch(Routes.user(), {
      body: { banner: resolvedBanner },
    });

    console.log('The banner was uploaded successfully!!');
  } catch (error) {
    console.error('Error when uploading the banner:', error);
  }
}

// Log in to Discord and execute the updateBanner function
client.login('TOKEN').then(() => {
  updateBanner();
});

