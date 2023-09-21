import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./videoBox.css";
import { useNavigate } from "react-router-dom";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import {channelInfos, setTimeAndView , videosInformation} from '../utils/utils.jsx'

export default function VideoBox({videos}) {
  let navigate = useNavigate();
  const contextDataVideo = useContext(ChannelDetailsContext)
  const [channelImage, setChannelImage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [timePassed, setTimePassed] = useState("");
  const [viewVideo, setViewVideo] = useState("")
  

  useEffect(()=>{
    let dateAndTime = setTimeAndView(videos.snippet.publishedAt , videos.statistics.viewCount);
    // contextDataVideo.setChannelID(videos.snippet.channelId)

    setViewVideo(dateAndTime.view)
    setTimePassed(dateAndTime.time)
    
    let channelInfo = channelInfos(videos.snippet.channelId)
    channelInfo.then((res) => {
      if (res.status === 200) {
        setChannelImage(res.data.items[0].snippet.thumbnails.high.url);
        setChannelName(res.data.items[0].snippet.title);
      }
    })
  },[])

  

  return (
    <div className="col">
      <div className=" video-box__content " >
        <div className="video-box__content-poster position-relative" onClick={()=> navigate(`/video/${videos.id}`)}>
          <img
            src={`${videos.snippet.thumbnails.high.url}`}
            className="video-box__poster-image"
            alt=""
          />
          <span className="video-box__duration">21:21</span>
        </div>
        <div className="video-box__infos  " onClick={()=> navigate(`/channel/${videos.snippet.channelId}`)}>
          <div className="video-box__infos-img-channel align-self-start">
            <img
              src={channelImage}
              className="video-box__infos-img h-100"
              alt=""
            />
          </div>
          <div className="video-box__infos-texts">
            <p className="video-box__infos-texts-title video-title">
              {videos.snippet.title}
            </p>
            <p className="video-box__infos-texts-name">{channelName}</p>
            <p className="d-flex align-items-center justify-content-between">
              <span className="video-box__infos-texts-views">{viewVideo} </span>
              <span className="video-box__infos-texts-timeUpload">
                last {timePassed}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
