import apiRequests from "../configs/Configs.jsx";

const getVideos = (nextPageToken, maxResult = 9) => {
  return apiRequests("/videos", {
    params: {
      part: "statistics,snippet,contentDetails",
      chart: "mostPopular",
      maxResults: maxResult,
      pageToken: nextPageToken,
    },
  });
};

const videosInformation = (videoID) => {
  return apiRequests("/videos", {
    params: {
      part: "statistics,snippet,contentDetails",
      id: videoID,
    },
  });
};

const videoComments = (videoID, nextPageToken="") => {
  return apiRequests("/commentThreads", {
    params: {
      part: "snippet",
      videoId: videoID,
      pageToken: nextPageToken,
    },
  });
};

const getVideoSuggestions = (text,nextPageToken="")=>{

  return apiRequests("/search", {
    params: {
      part: "snippet",
      q:text,
      maxResults:5,
      type: 'video',
      pageToken:nextPageToken
    },
  });

}

export { getVideos, videosInformation, videoComments ,getVideoSuggestions};
