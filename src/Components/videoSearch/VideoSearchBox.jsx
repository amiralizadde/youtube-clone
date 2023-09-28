import React, { useEffect, useState ,useContext} from 'react'
import './videoSearchBox.css'
import { convertNumber ,convertTime , videosInformation , channelInfos} from '../utils/utils.jsx'
import { ChannelDetailsContext } from '../../contexts/ChannelDetailsContext.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './videoSearchBox.css'

export default function VideoSearchBox({video}) {

  const [dataVideoSearch , setDataVideoSearch] = useState(null)
  const [dataChannelSearch , setDataChannelSearch] = useState(null)
  const [timePassed, setTimePassed] = useState("");
  const [viewVideo, setViewVideo] = useState("")


  useEffect(()=>{
    
    let time
    let view
    dataVideoSearch && (
      time =convertTime(dataVideoSearch.items[0].snippet.publishedAt),
      view = convertNumber(dataVideoSearch.items[0].statistics.viewCount)
    )
    setTimePassed(time)
    setViewVideo(view)
  },[dataVideoSearch])

  useEffect(()=>{
   let dataVideo = videosInformation(video.id.videoId)
   let dataChannel = channelInfos(video.snippet.channelId)
   dataVideo.then(res=>{
    if (res.status === 200) {
      setDataVideoSearch(res.data)
    }
   })

   dataChannel.then(res=>{
    if (res.status === 200) {
      // console.log('res channel ' , res.data);
      setDataChannelSearch(res.data)
    }
   })
  },[video])
  return (
    <>
     <div className="row row-cols-md-2" style={{direction:"ltr"}}>
        <div className="col-md-4">
          <Link to={`/video/${video.id.videoId}`}>
            <img src={`${video.snippet.thumbnails.high.url}`} className='searchVideo__image' alt="" />
          </Link>
        </div>
        <div className="col-md-8 mt-5 video-box__search" >
          <Link to={`/channel/${video.snippet.channelId}`} className=''>
            <p className='text-white'>{video.snippet.title}</p>
            <p className="d-flex align-items-center my-3">
                  <span className="video-box__infos-texts-views">{viewVideo} views </span>
                  <span className="video-box__infos-texts-timeUpload ms-3"> last {timePassed} </span>
            </p>
            <div>
              {dataChannelSearch && dataVideoSearch &&(
                <div className=''>
                  <div className='d-flex align-items-center'>
                      <img src={`${dataChannelSearch.items[0].snippet.thumbnails.high.url}`} className='channel-image' alt="" />
                      <p className='text-white ms-3'>{dataChannelSearch.items[0].snippet.title}</p>
                  </div>
                  <p className='text-secondary fs-5 mt-5'>{dataVideoSearch.items[0].snippet.localized.description.substring(0, 150)}</p>
                </div>
              )}
            </div>
            </Link>
        </div>
      </div>
    </>
  )
}
