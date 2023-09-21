import React, { useEffect, useState,useContext } from "react";
import "./home.css";
import axios from "axios";
import YouTube from "react-youtube";
import VideoBox from "../../Components/videoBox/VideoBox";
import Video from "../../Components/video/Video.jsx";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext";
import { api_key , getVideos } from "../../Components/utils/utils.jsx";
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Index() {
  // const videoLists= useContext(ChannelDetailsContext)
  const [videoLists, setVideoLists] = useState([]);
  const [nextPageToken , setNextPageToken] = useState(null)
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if there is more data to load
  const [isLoading, setIsLoading] = useState(false); // Flag to indicate if the data is currently being loaded


 


  useEffect(() => {
   let videos = getVideos()
      videos.then((res) => {
        if (res.status === 200) {
          setNextPageToken(res.data.nextPageToken)
          setVideoLists(res.data.items);
        }
      });
  }, []);



  const fetchMoreData = () => {
    let videos = getVideos(nextPageToken,"6")
    videos.then((res) => {
      if (res.status === 200) {
        setNextPageToken(res.data.nextPageToken)
        setVideoLists(prevState=>[...prevState , ...res.data.items]);
      }
    });
  };



  return (
    <div>

      {videoLists.length ? (
        <div className="container w-100 home-content">
          <InfiniteScroll
            dataLength={videoLists.length}
            next={fetchMoreData}
            hasMore={hasMore} 
            loader={<h4 className="text-white">Loading...</h4>}
            className="row row-cols-1 row-cols-md-2  row-cols-lg-3  home-content"
          >
            {videoLists.map((video) => (
                // <VideoBox  key={video.id} videos={video}/>
                <Video key={video.id} video={video} page="home"/>
            ))}
            </InfiniteScroll>
        </div>
      ) : (
        <p className="bg-light ">please Wait...</p>
      )}
    </div>
  );
}

// export default Index;
