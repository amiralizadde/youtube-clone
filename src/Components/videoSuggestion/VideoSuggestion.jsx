import React, { useEffect, useState } from "react";
import "./videoSuggestion.css";
import { setTimeAndView  , channelInfos , videosInformation} from "../../Components/utils/utils.jsx";

export default function VideoSuggestion({ videos }) {
  const [timePassed, setTimePassed] = useState("");
  const [viewVideo, setViewVideo] = useState("");
  const [channelName, setChannelName] = useState("");




  useEffect(() => {
    

    let channelInfo  = channelInfos(videos.snippet.channelId)

    channelInfo.then(res=>{
      if(res.status === 200 ){
        setChannelName(res.data.items[0].snippet.title);
      }
    })

    let videoInfo = videosInformation(videos.id.videoId)
    videoInfo.then(res=>{
      if (res.status === 200) {

        let dateAndView = setTimeAndView(videos.snippet.publishedAt , res.data.items[0].statistics.viewCount );
        setViewVideo(dateAndView.view)
        setTimePassed(dateAndView.time)
      }
    })

  }, []);

  return (
    // <div className="col  border border-primary">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-2 video-suggestion__content">
        <div className="col col-sm-4 col-lg-10 col-xl-6 video-suggestion__image-content">
          <img
            src={`${videos.snippet.thumbnails.high.url}`}
            className="video-suggestion__image"
            alt=""
          />
        </div>
        <div className="col col-sm-8 col-lg-10 col-xl-6 video-suggestion__information-content ">
          <p className="video-title">{videos.snippet.title}</p>
          <p className="video-information">{channelName}</p>
          <p className="d-flex align-items-center justify-content-between video-information">
            <span className="">{viewVideo}</span>
            <span className=" mx-4">last {timePassed}</span>
          </p>
        </div>
      </div>

      
    // {/* </div> */}
  );
}
