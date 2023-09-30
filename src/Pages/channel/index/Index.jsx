import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import {channelVideos} from '../../../services/Axios/requests/Channels.jsx'
import {videosInformation}from '../../../services/Axios/requests/HomeVideo.jsx'
import { useParams } from "react-router-dom";
import Video from "../../../Components/video/Video.jsx";

export default function Index() {
  
  const params = useParams();
  const [videos, setVideos] = useState([]);
  const [videosChannel , setVideosChannel] = useState([])


// recive channel videos details
  useEffect(()=>{

    videos && videos.map(video=>{
       video.id.videoId && videosInformation(video.id.videoId)
      .then(res=>setVideosChannel(prevState=>[...prevState , ...res.items]))
      .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );
    })

  },[videos])

  // recive channel videos
  useEffect(() => {
    channelVideos(params.channelID)
    .then(res =>setVideos(res.items))
    .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );
  }, []);

  return (
    <div className="">
      <section className="channel-videos">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            {videosChannel &&
              videosChannel.map((video) => (
                      <Video key={video.id} video={video} page="channel"/>
                  )
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
