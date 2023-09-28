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

const getMyChannel = (token) =>{
console.log('token' , token);
    return apiRequests("/channels", {
       params: {
            part: "snippet",
            mine: true,
            access_token:token
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
      });

}

const channelSubScribes = (token) => {

    return apiRequests("/subscriptions", {
        params: {
            part: "snippet",
            mine: true,
            maxResults: 15,
            access_token:token,
          },
       });

}

export { channelInformation , channelVideos , getMyChannel , channelSubScribes }