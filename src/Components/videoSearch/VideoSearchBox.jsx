import React, { useEffect, useState ,useContext} from 'react'
import './videoSearchBox.css'
import { convertNumber ,convertTime} from '../utils/utils.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './videoSearchBox.css'
import swal from 'sweetalert'
import {videosInformation} from '../../services/Axios/requests/HomeVideo.jsx'
import {channelInformation} from '../../services/Axios/requests/Channels.jsx'

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
   videosInformation(video.id.videoId)
   .then(res=> setDataVideoSearch(res))
   .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );

      channelInformation(video.snippet.channelId)
   .then(res=> setDataChannelSearch(res))
   .catch((err) =>
        swal({
          text: err,
          icon: "warning",
          dangerMode: true,
        })
      );
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
