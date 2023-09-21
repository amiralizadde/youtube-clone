import React,{useContext , useEffect , useState} from 'react'
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import VideoSearchBox from '../../Components/videoSearch/VideoSearchBox.jsx';
import InfiniteScroll from 'react-infinite-scroll-component'
import {getSuggestionVideos} from '../../Components/utils/utils.jsx'
import {useParams} from 'react-router-dom'

export default function SearchVideo() {

  let context = useContext(ChannelDetailsContext)
  let params = useParams()
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken , setNextPageToken] = useState(context.videoSearchResult.nextPageToken)
  const [searchResults , setSearchResults] = useState(context.videoSearchResult.items) 

  useEffect(()=>{
    console.log('searchResults' , searchResults);
  },[])

  
  const fetchMoreData = () => {
    let videos = getSuggestionVideos(params.searchValue,nextPageToken)
    videos.then((res) => {
      if (res.status === 200) {
        setNextPageToken(res.data.nextPageToken)
        setSearchResults(prevState=>[...prevState , ...res.data.items]);
      }
    });
  };

  return (
    <>
    {searchResults &&
    <div className="container-fluid">
        <InfiniteScroll
            dataLength={searchResults.length}
            next={fetchMoreData}
            hasMore={hasMore} 
            loader={<h4 className="text-white">Loading...</h4>}
            className=""
          >
      {searchResults.map(video=>(
        // console.log('video' , video)
        <VideoSearchBox key={video.id.videoId} video={video}/>
      ))}
      </InfiniteScroll>
      </div>
    }
    </>
  )
}
