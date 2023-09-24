import React, { useEffect, useState, useContext, useRef } from "react";
import "./videoPlay.css";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import Video from "../../Components/video/Video.jsx";
import axios from "axios";
import { useFormik } from "formik";
import {
  api_key,
  setTimeAndView,
  getSuggestionVideos,
  videosInformation,
  channelInfos,
  commentsVideo,
  convertNumber,
  convertTime,
} from "../../Components/utils/utils.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Comments from "../../Components/comments/comments";
import ChannelInformation from "../../Components/channelInformation/ChannelInformation.jsx";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import VideoSuggestion from "../../Components/videoSuggestion/VideoSuggestion.jsx";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SortIcon from "@mui/icons-material/Sort";

export default function VideoPlay() {
  const [videoSuggestions, setVideoSuggestions] = useState([]);
  const [videoAllSuggestions, setVideoAllSuggestions] = useState([]);
  const [videoSuggestionInfo, setVideoSuggestionInfo] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);
  const [dataChannel, setDataChannel] = useState("");
  const [timePassed, setTimePassed] = useState("");
  const [viewVideo, setViewVideo] = useState("");
  const [numberComment, setNumberComment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isUpdateComments , setIsUpdateComments] = useState(false)

  let context = useContext(ChannelDetailsContext);

  let params = useParams();
  let insertCommentBtn = useRef();
  let cancelInsertCommentBtn = useRef();

  useEffect(() => {
    let videoInfo = videosInformation(params.videoID);
    console.log("params.videoID", params.videoID);
    videoInfo.then((res) => {
      if (res.status === 200) {
        console.log("res videoInfo", res.data);
        setDataVideo(res.data.items);
        setNumberComment(
          convertNumber(res.data.items[0].statistics.commentCount)
        );
      }
    });
  }, [params]);

  useEffect(() => {
    console.log('update');
    let comment = commentsVideo(params.videoID);
    comment.then((res) => {
      if (res.status === 200) {
        setNextPageToken(res.data.nextPageToken);
        setComments(res.data.items);
      }
    });
  }, [params]);

  useEffect(() => {
    let channelInfo;

    dataVideo.length &&
      (setViewVideo(convertNumber(dataVideo[0].statistics.viewCount)),
      setTimePassed(convertTime(dataVideo[0].snippet.publishedAt)),
      (channelInfo = channelInfos(dataVideo[0].snippet.channelId)),
      channelInfo.then((res) => {
        if (res.status === 200) {
          setDataChannel(res.data);
        }
      }));
  }, [dataVideo]);

  useEffect(() => {
    let videosSuggestionInfo = [...videoSuggestions];

    videosSuggestionInfo = videosSuggestionInfo.map((videoSuggestion) => {
      return videosInformation(videoSuggestion.id.videoId);
    });
    Promise.all(videosSuggestionInfo).then((data) => {
      let newVideoSuggestion = [];
      data.map((item) => {
        item.status === 200 && newVideoSuggestion.push(item.data.items[0]);
      });
      setVideoAllSuggestions(newVideoSuggestion);
    });
  }, [videoSuggestions]);

  useEffect(() => {
    let suggestion;
    dataVideo.length &&
      (console.log("dataVideo 114", dataVideo[0].snippet.title),
      (suggestion = getSuggestionVideos(dataVideo[0].snippet.title)),
      suggestion.then((res) => {
        if (res.status === 200) {
          console.log("res suggestion video ", res.data.items);
          setVideoSuggestions(res.data.items);
        }
      }));
  }, [dataVideo]);

  const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const insertCommentFunction = async (values) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const apiKey = api_key; // جایگزین YOUR_API_KEY با کلید API کپی کرده شده خود شوید

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${apiKey}`;
    const requestBody = {
      snippet: {
        videoId: params.videoID,
        topLevelComment: {
          snippet: {
            textOriginal: values.insertComment,
          },
        },
      },
    };
    console.log("requestBody", requestBody);
    await axios
      .post(
        "https://www.googleapis.com/youtube/v3/commentThreads",
        requestBody,
        {
          params: {
            part: "snippet" 
          },
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsUpdateComments(true)
        }
      }).catch(err=>{
        console.log('err',err);
      })
  };

  const form = useFormik({
    initialValues: { insertComment: "" },

    onSubmit: (values) => {
      insertCommentFunction(values);
    },

    validate: (values) => {
      const errors = {};

      if (values.insertComment === "") {
        errors.insertComment = "";
      } else if (
        values.insertComment.length <= 2 &&
        values.insertComment.length >= 1
      ) {
        errors.insertComment = "کامنت مناسب نیست";
      }

      return errors;
    },
  });
  const insertCommentFucus = () => {
    insertCommentBtn.current.classList.remove("inactive");
    cancelInsertCommentBtn.current.classList.remove("inactive");
  };
  const cancelInsertComment = () => {
    cancelInsertCommentBtn.current.classList.add("inactive");
    insertCommentBtn.current.classList.add("inactive");
  };

  const fetchMoreData = () => {
    let comment = commentsVideo(params.videoID, nextPageToken);
    comment.then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        setNextPageToken(res.data.nextPageToken);
        setComments((prevState) => [...prevState, ...res.data.items]);
      }
    });
  };

  return (
    <div className="videoPlay">
      <div className="container-fluid  " id="videoPlay_content">
        <div className="text-white videoPlay__content-video">
          <YouTube
            videoId={params.videoID}
            opts={opts}
            className="videoPlay__video"
          />
          <p className="video-title fs-2 fw-light">
            {dataVideo.length ? dataVideo[0].snippet.title : ""}
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-3">
            <div>
              <p className="d-flex align-items-center  video-information">
                <span className="">{viewVideo} views</span>
                <span className=" mx-4">last {timePassed}</span>
              </p>
            </div>
            <div className="">
              <span className="mx-3">
                <ThumbUpIcon className="fs-2" />
                {dataVideo.length
                  ? Number(dataVideo[0].statistics.likeCount).toLocaleString()
                  : 1}
              </span>

              <span className="mx-3">
                <ScreenShareIcon className="fs-2  " />
                SHARE
              </span>
              <span className="mx-3">
                <PlaylistAddIcon className="fs-2  " />
                SAVE
              </span>
              <span className="mx-3">
                <MoreHorizIcon className="fs-2  " />
              </span>
            </div>
          </div>
        </div>
        <div className=" text-white videoPlay__content-suggestion">
          <div className="row row-cols-1">
            {videoAllSuggestions.length &&
              videoAllSuggestions
                .slice(0, 4)
                .map((videoSuggestion) => (
                  <Video
                    key={videoSuggestion.id}
                    video={videoSuggestion}
                    page="videoPlay"
                  />
                ))}
          </div>
        </div>
        <div className="videoPlay__content-description">
          {dataChannel && (
            <>
              <ChannelInformation dataChannel={dataChannel} />
              <pre className="videoPlay__description ">
                {showMore ? (
                  <>
                  {console.log(dataVideo[0].snippet.description)}
                    {dataVideo[0].snippet.description}
                    <br />
                    <button
                      className="btn text-secondary fs-2  p-0"
                      onClick={() => setShowMore(!showMore)}
                    >
                      Show less
                    </button>
                  </>
                ) : (
                  <>
                    {dataVideo[0].snippet.description.length - 1 > 150 ? (
                      <>
                        {dataVideo[0].snippet.description.substring(0, 150)}
                        <br />
                        <button
                          className="btn text-secondary fs-2 p-0"
                          onClick={() => setShowMore(!showMore)}
                        >
                          Show more
                        </button>
                      </>
                    ) : (
                      <>
                        {dataVideo[0].snippet.description}
                      </>
                    )}
                  </>
                )}
              </pre>
            </>
          )}
          <hr className="text-secondary" />
          <div className="videoPlay__comments">
            <div className="videoPlay__comments-insert">
              <div className="text-white">
                <span className="">{numberComment} comments</span>
                <span className="mx-5">
                  {" "}
                  <SortIcon className="fs-1" />
                  SORT BY
                </span>
              </div>
              {context.myData.length ? (
                <form
                  className="videPlay__insertComment "
                  onSubmit={form.handleSubmit}
                >
                  <div className="d-flex align-items-center position-relative">
                    <img
                      src={`${context.myData[0].snippet.thumbnails.high.url}`}
                      alt=""
                      className="image-profile"
                    />
                    <input
                      type="text"
                      name="insertComment"
                      value={form.values.insertComment}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      onFocus={insertCommentFucus}
                      className="videPlay__insertComment-input my-5"
                      placeholder="Add a comment..."
                    />
                    <br />
                    {form.errors.insertComment &&
                      form.touched.insertComment && (
                        <span className=" error">
                          {form.errors.insertComment}
                        </span>
                      )}
                  </div>
                  <div className="align-self-end">
                    <button
                      className="cancelInsertCommentBtn inactive"
                      ref={cancelInsertCommentBtn}
                      onClick={cancelInsertComment}
                    >
                      cencel
                    </button>
                    <button
                      type="submit"
                      className="insertCommentBtn mx-3 inactive"
                      ref={insertCommentBtn}
                    >
                      comment
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="videoPlay__comments-people ">
              <InfiniteScroll
                dataLength={comments.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-white">Loading...</h4>}
                className="videoPlay__comments-people "
              >
                {comments.length > 0
                  ? comments.map((comment) => (
                       console.log('update comment'),
                      <Comments key={comment.id} comment={comment} />
                    ))
                  : ""}
                  {
                    comments.length > 10 ? (
                         <>
                            <button className="btn p-3 px-5 fs-4 ms-5  text-secondary showMore_btn" onClick={fetchMoreData}>
                              show more
                            </button>
                         </>
                    ) : (
                      ""
                    )
                  }
           
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
