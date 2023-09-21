import axios from "axios";

export const api_key = "AIzaSyBFxfqerRP-qdIaEyGnWPvfbQ3a27YqdFI";

const channelInfos = (channelID) => {
  const res = axios.get("https://www.googleapis.com/youtube/v3/channels", {
    params: {
      part: "snippet,brandingSettings,contentDetails,statistics",
      id: `${channelID}`,
      key: api_key,
    },
  });
  return res;
};

const videosChannels = (channelID) => {
  console.log("channelID:utils", channelID);
  const res = axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      channelId: `${channelID}`,
      maxResults: 20,
      key: api_key,
    },
  });
  return res;
};

const getVideos = (nextPageToken,maxResult=9) => {
  const res = axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "statistics,snippet,contentDetails",
      chart: "mostPopular",
      maxResults:maxResult,
      key: api_key,
      pageToken:nextPageToken
    },
  });
  return res;
};

const videosInformation = (videoID) => {
  const res = axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "statistics,snippet,contentDetails",
      id: videoID,
      key: api_key,
    },
  });
  return res;
};

const setTimeAndView = (publishDate, viewCount = 2000) => {
  let time = "";
  let view;

  //   console.log(publishDate, viewCount);
  // let publishDate =videos.snippet.publishedAt; //تاریخ انتشار
  let currentDate = new Date(); //تاریخ فعلی
  let publishedDateTime = new Date(publishDate);
  let timePasse = currentDate - publishedDateTime; //میزان زمان سپری شده
  let daysPassed = Math.floor(timePasse / (1000 * 60 * 60 * 24));
  let hoursPassed = Math.floor(timePasse / (1000 * 60 * 60));
  let weeksPassed = Math.floor(daysPassed / 7);
  let mounthPassed = Math.floor(daysPassed / 31);
  let yearPassed = Math.floor(daysPassed / 365);

  if (daysPassed < 1) {
    time = hoursPassed + "hours ago";
  } else if (daysPassed >= 1 && daysPassed <= 7) {
    time = daysPassed + " days ago ";
  } else if (daysPassed > 7 && daysPassed <= 31) {
    time = weeksPassed + "weeks ago";
  } else if (daysPassed > 31 && daysPassed <= 365) {
    time = mounthPassed + "mounth ago";
  } else if (daysPassed > 366) {
    time = yearPassed + "years ago";
  }

  let videoView = Math.floor(viewCount / 1000);

  if (videoView < 1000) {
    view = videoView + "views";
  } else if (videoView > 1000) {
    view = Math.floor(videoView / 1000) + "k views";
  }

  return { time, view };
};

const getSuggestionVideos = (text,nextPageToken) => {
   const res = axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: "snippet",
      q:text,
      maxResults:5,
      type: 'video',
      key: api_key,
      pageToken:nextPageToken
    },
  })
  return res
};

const commentsVideo = (videoID,nextPageToken) => {
 const res = axios.get("https://www.googleapis.com/youtube/v3/commentThreads", {
      params: {
        part: "snippet",
        videoId: videoID,
        key: api_key,
        pageToken:nextPageToken
      },
    })
  return res
};

const convertNumber = (num) => {
  let number;

  if (num < 1000) {
    return num;
  } else if (num > 1000 && num < 1000000) {
    number = Math.floor(num / 1000) + "K";
    return number;
  } else if (num > 1000000) {
    number = Math.floor(num / 1000000) + "M";
    return number;
  }
};
const convertTime = time=>{

  let timeVideo = "";
  let currentDate = new Date(); //تاریخ فعلی
  let publishedDateTime = new Date(time);
  let timePasse = currentDate - publishedDateTime; //میزان زمان سپری شده
  let daysPassed = Math.floor(timePasse / (1000 * 60 * 60 * 24));
  let hoursPassed = Math.floor(timePasse / (1000 * 60 * 60));
  let weeksPassed = Math.floor(daysPassed / 7);
  let mounthPassed = Math.floor(daysPassed / 31);
  let yearPassed = Math.floor(daysPassed / 365);

  if (daysPassed < 1) {
    timeVideo = hoursPassed + "hours ago";
  } else if (daysPassed >= 1 && daysPassed <= 7) {
    timeVideo = daysPassed + " days ago ";
  } else if (daysPassed > 7 && daysPassed <= 31) {
    timeVideo = weeksPassed + "weeks ago";
  } else if (daysPassed > 31 && daysPassed <= 365) {
    timeVideo = mounthPassed + "mounth ago";
  } else if (daysPassed > 366) {
    timeVideo = yearPassed + "years ago";
  }
  return timeVideo
}

export {
  channelInfos,
  setTimeAndView,
  videosChannels,
  videosInformation,
  getVideos,
  getSuggestionVideos,
  commentsVideo,
  convertNumber,
  convertTime
};
