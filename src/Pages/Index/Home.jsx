import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import Video from "../../Components/video/Video.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVideos } from "../../services/Axios/requests/HomeVideo.jsx";
import swal from "sweetalert";
import BeatLoader from "react-spinners/BeatLoader";



export default function Index() {


  const [videoLists, setVideoLists] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if there is more data to load
  const [isLoading, setIsLoading] = useState(false); // Flag to indicate if the data is currently being loaded


  useEffect(() => {
    getVideos()
      .then((res) => {
        setVideoLists(res.items);
        setNextPageToken(res.nextPageToken);
      })
      .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );
  }, []);

  const fetchMoreData = () => {
    getVideos(nextPageToken, "6").then((res) => {
      setNextPageToken(res.nextPageToken),
        setVideoLists((prevState) => [...prevState, ...res.items]);
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
              <Video key={video.id} video={video} page="home" />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <p className=""><BeatLoader color="white" /></p>
      )}
    </div>
  );
}
