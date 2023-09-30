import React, { useEffect, useState } from "react";
import "./videoSuggestion.css";
import {convertNumber , convertTime} from "../../Components/utils/utils.jsx";
import {videosInformation} from '../../services/Axios/requests/HomeVideo.jsx'
import {channelInformation} from '../../services/Axios/requests/Channels.jsx'

export default function VideoSuggestion({ videos }) {
  const [timePassed, setTimePassed] = useState("");
  const [viewVideo, setViewVideo] = useState("");
  const [channelName, setChannelName] = useState("");




  useEffect(() => {
    

    channelInformation(videos.snippet.channelId)
    .then(res=> setChannelName(res.items[0].snippet.title))
    .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );

     videosInformation(videos.id.videoId)
      .then(res=>{
        let view = convertNumber(res.items[0].statistics.viewCount )
        let time = convertTime(videos.snippet.publishedAt)
        setViewVideo(view)
        setTimePassed(time)
       })
       .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );

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
