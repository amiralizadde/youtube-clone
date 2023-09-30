import React , {useEffect , useState} from 'react'
import './Video.css'
import {convertTime , convertNumber} from '../utils/utils.jsx'
import { useNavigate } from 'react-router-dom';
import  moment  from 'moment';
import { channelInformation } from '../../services/Axios/requests/Channels.jsx';
import ClipLoader from "react-spinners/ClipLoader";

export default function Video({video , page}) {
    let navigate = useNavigate();
    const [channelData , setChannelData] = useState([])
    const [timePassed, setTimePassed] = useState(0);
    const [viewVideo, setViewVideo] = useState(0);
    const [timeVideo, setTimeVideo] = useState(null)
   

    useEffect(()=>{
        let duration
        let timeOfVideo =  moment.duration(video.contentDetails.duration);
        let time = convertTime(video.snippet.publishedAt)
        let view = convertNumber(video.statistics.viewCount)
       
        if (timeOfVideo.asHours() >= 1) {
            duration = moment.utc(timeOfVideo.asMilliseconds()).format('hh:mm:ss')
        }else{
            duration = moment.utc(timeOfVideo.asMilliseconds()).format('mm:ss')
        }
        setTimeVideo(duration)
        setTimePassed(time)
        setViewVideo(view)

        channelInformation(video.snippet.channelId)
        .then(res=>setChannelData(res.items))
    },[])

  return (
    channelData.length ? (
    <div className={`col mt-4 videoBox__content  ${page === "videoPlay" ? "px-5":""}`}>
        <div className={`videoBox__content-image position-relative  ${ page === "videoPlay" ? 'videoPlay-image-box' : ''}`}>
            <img  src={`${video.snippet.thumbnails.high.url}`} alt="" className='videoBox__image'onClick={()=> navigate(`/video/${video.id}`)}/>
            <span className="videoBox__duration">{timeVideo}</span>
        </div>
        <div className='videoBox__content-information ' onClick={()=> navigate(`/channel/${video.snippet.channelId}`)}>
            <div className={` ${page === "channel" || page === "videoPlay" ? 'inactive' : 'videoBox__content-image-channel'}`}>
                <img src={`${channelData[0].snippet.thumbnails.high.url}`} alt="" className='videoBox__image-channel'/>
            </div>
            <div className={`videoBox__information mt-2 ${page === "channel" || page === "videoPlay" ? 'p-0' : ''}`} >
                <p className='videoBox__information-title text-white'>{video.snippet.title}</p>
                <p className='videoBox__information-name-channel'>{channelData[0].snippet.title}</p>
                <p className="videoBox__information-publish">
                    <span className="videoBox__information-views">{viewVideo} views</span>
                    <span className="videoBox__information-timeUpload mx-4"> last {timePassed}  </span>
                </p>
            </div>
        </div>
    </div>
    ):(
        <p className="text-white"><ClipLoader  color="#FFFFFF "/></p>
    )
  )
}
