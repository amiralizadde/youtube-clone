import React,{useContext , useEffect , useState} from 'react'
import { DataContext } from "../../contexts/DataContext.jsx";
import VideoSearchBox from '../../Components/videoSearch/VideoSearchBox.jsx';
import InfiniteScroll from 'react-infinite-scroll-component'
import {useParams} from 'react-router-dom'
import { getVideoSuggestions } from '../../services/Axios/requests/HomeVideo.jsx';

export default function SearchVideo() {

  let context = useContext(DataContext)
  let params = useParams()
  const [hasMore, setHasMore] = useState(true);
  const [newParms  , setNewParmas] = useState('')
  const [nextPageToken , setNextPageToken] = useState(context.videoSearchResult.nextPageToken)
  const [searchResults , setSearchResults] = useState(context.videoSearchResult) 



  useEffect(()=>{
    console.log('changed');
   setSearchResults(context.videoSearchResult)
  },[context.videoSearchResult])


  
  const fetchMoreData = () => {
    getVideoSuggestions(params.searchValue,nextPageToken)
    .then((res) => {
        setNextPageToken(res.nextPageToken)
        setSearchResults(prevState=>[...prevState , ...res.items]);
    });
  };

  return (
    <>
    {searchResults &&
    <div className="container-fluid mt-5" >
        <InfiniteScroll
            dataLength={searchResults.length}
            next={fetchMoreData}
            hasMore={hasMore} 
            loader={<h4 className="text-white">Loading...</h4>}
            className=""
          >
      {searchResults.map(video=>(
        <VideoSearchBox key={video.id.videoId} video={video}/>
      ))}
      </InfiniteScroll>
      </div>
    }
    </>
  )
}
