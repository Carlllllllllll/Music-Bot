setInterval(() => client.user.setActivity({ 
  name: `Music 🎶`, 
  type: ActivityType.Listening }), 10000);
  setInterval(() => client.user.setActivity({ 
  name: `To Your Vibe 🎶`, 
  type: ActivityType.Listening }), 10000);
  setInterval(() => client.user.setActivity({ 
  name: `Your Queue 🎶`, 
  type: ActivityType.Watching }), 10000);
  setInterval(() => client.user.setActivity({ 
  name: `Music 🎶`, 
  type: ActivityType.Playing }), 10000);
  setInterval(() => {
  const serverCount = client.guilds.cache.size;
  const memberCount = client.users.cache.size;

  client.user.setActivity({
    name: `Servers: ${serverCount} | Members: ${memberCount}`,
    type: ActivityType.Watching
  });
}, 10000);
