import apiRequests from "../configs/Configs.jsx";

const channelInformation = (channelID) => {
  return apiRequests("/channels", {
    params: {
      part: "snippet,brandingSettings,contentDetails,statistics",
      id: `${channelID}`,
    },
  });
};

const channelVideos = (channelID) =>{

    return apiRequests("/search", {
        params: {
            part: "snippet",
            channelId: `${channelID}`,
            maxResults: 20
          },
      });

}

export {channelInformation , channelVideos}