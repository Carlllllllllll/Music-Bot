async function updateBanner() {
  try {
    const bannerUrl = "https://th.bing.com/th/id/R.fc4f45f89d3de367b4601a467cc9c166?rik=r8AiECSlQ%2ftWLw&riu=http%3a%2f%2fwww.galesaur.com%2fmusic%2f00-10.gif&ehk=3scZcznrIZpQeYBEZfWL69uR7A3SREZbsD7jOFswdSM%3d&risl=&pid=ImgRaw&r=0";
    const resolvedBanner = await DataResolver.resolveImage(bannerUrl);

    await client.rest.patch(Routes.user(), {
      body: { banner: resolvedBanner },
    });

    console.log('the banner was uploaded successfully!!');
  } catch (error) {
    console.error('error when uploading the banner.', error);
  }
}


updateBanner();
