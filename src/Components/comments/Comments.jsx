import React,{useState , useEffect} from 'react'
import {convertTime} from '../utils/utils.jsx'
import './comments.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function Comments({comment}) {
    const [timeComment , setTimeComment] = useState()

  

    useEffect(()=>{
        let timeCommentVideo = convertTime(comment.snippet.topLevelComment.snippet.publishedAt)

        timeCommentVideo === '0hours ago' ? setTimeComment('just now') : setTimeComment(timeCommentVideo)
        
    },[])


  return (
    <>
        <>
        <div className="container d-flex mt-4  py-4" id="comment">
             <div className="comment__content-image mx-3">
                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" className="comment__image" />
             </div>
             <div className="comment__content-infos">
                <p className='my-2'><span className='video-title mx-2'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</span><span className='video-information'>{timeComment}</span></p>
                <p className='video-information my-2'>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                <p className='video-information'><span className='mx-3 fs-5'>{comment.snippet.topLevelComment.snippet.likeCount === 0 ? '' : comment.snippet.topLevelComment.snippet.likeCount}<ThumbUpIcon className='mx-1'/></span><span><ThumbDownAltIcon /></span></p>
             </div>
        </div>
        </>
    </>
  )
}
