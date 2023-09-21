import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { ChannelDetailsContext } from "../../../contexts/ChannelDetailsContext.jsx";
import {
  channelInfos,
  videosChannels,
  videosInformation
} from "../../../Components/utils/utils.jsx";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import VideoBox from '../../../Components/videoBox/VideoBox.jsx'
import Video from "../../../Components/video/Video.jsx";

export default function Index() {
  let contextData = useContext(ChannelDetailsContext);
  const params = useParams();

  const [videos, setVideos] = useState([]);
  const [videosChannel , setVideosChannel] = useState([])

  useEffect(()=>{
    console.log('videosChannel :' , videosChannel);
  },[videosChannel])

  useEffect(()=>{

    videos && videos.map(video=>{
      let videoitem = video.id.videoId && videosInformation(video.id.videoId)
      videoitem && videoitem.then(res=>{
        if (res.status === 200) {
          setVideosChannel(prevState=>[...prevState , ...res.data.items])
        }
      })
    })

  },[videos])

  useEffect(() => {
    let videosChannel = videosChannels(params.channelID);
    videosChannel.then((res) => {
      if (res.status === 200) {
        setVideos(res.data.items);
      }
    });
  }, []);

  return (
    <div className="">
      <section className="channel-videos">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            {videosChannel &&
              videosChannel.map(
                (video) => (
                  <>
                    {/* // <div className="col g-5" > */}
                      {/* <Link to={`/video/${video.id.videoId}`}> */}
                        {/* <img
                          src={`${video.snippet.thumbnails.high.url}`}
                          className=" channel-videos__image"
                          alt=""
                        /> */}
                        {/* {console.log('video channel : ' , video)} */}
                          {/* <VideoBox  videos={video} /> */}
                          <Video key={video.id} video={video} page="channel"/>
                      {/* </Link> */}
                    {/* </div> */}
                    </>
                  )
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
