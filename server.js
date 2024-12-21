const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

// API route to get YouTube live subscriber count
app.get("/api/youtube/channel/:channelId", async (req, res) => {
  const search = await axios.get(
      `https://mixerno.space/api/youtube-channel-counter/search/${req.params}`
    );
  const { channelId } = search.data.list[0][2];

  try {
    // Fetch data from the external API
    const response = await axios.get(
      `https://mixerno.space/api/youtube-channel-counter/user/${channelId}`
    );
    const subCount = response.data.counts[0].count;
    const totalViews = response.data.counts[3].count;
    const apiViews = response.data.counts[4].count;
    const apiSubCount = response.data.counts[2].count;
    const videos = response.data.counts[5].count;
    const channelLogo = response.data.user[1].count;
    const channelName = response.data.user[0].count;
    const channelBanner = response.data.user[2].count;
    const time = Math.floor(new Date(response.data.t).getTime()/1000.0);

    res.text(`${channelName} has ${subCount} subscribers! (at ${time})`);
  } catch (error) {
    console.error(error);
    res.status(500).text("Failed to fetch subscriber count");
  }
});

app.get("/api/youtube/channel/:channelId/studio", async (req, res) => {
  const search = await axios.get(
      `https://mixerno.space/api/youtube-channel-counter/search/${req.params}`
    );
  const { channelId } = search.data.list[0][2];

  try {
    // Fetch data from the external API
    const response = await fetch(
      `https://cors.stats100.xyz/https://studio.nia-statistics.com/api/channel/${channelId}`
    );
    const respons2e = await axios.get(
      `https://mixerno.space/api/youtube-channel-counter/user/${channelId}`
    );
    const info = await response.json();
    const subCount = info.channels.counts[2].count;
    const viewCount = info.channels.counts[1].count;
    const apiSubCount = respons2e.data.counts[2].count;
    const videos = respons2e.data.counts[5].count;
    const apiViews = respons2e.data.counts[4].count;
    const channelLogo = respons2e.data.user[1].count;
    const channelName = respons2e.data.user[0].count;
    const channelBanner = respons2e.data.user[2].count;
    const time = Math.floor(new Date(respons2e.data.t).getTime()/1000.0);

    res.text(`${channelName} has ${subCount} subscribers! (at ${time} studio)`);
  } catch (error) {
    console.error(error);
    res.status(200).text("Not in studio.");
  }
});

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
