import React, { useEffect, useState, useRef, useContext } from "react";
import "./sidebar.css";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { channelSubScribes } from "../../services/Axios/requests/Channels.jsx";

import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import FeedIcon from "@mui/icons-material/Feed";

export default function Side() {
  let context = useContext(ChannelDetailsContext);
  const [subscribes, setSubscribes] = useState([]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    context.myData.length > 0 &&
      channelSubScribes(token.token)
        .then((res) => setSubscribes(res.items))
        .catch((err) =>
          swal({
            text: err,
            icon: "warning",
            dangerMode: true,
          })
        );
  }, [context.myData]);

  return (
    <div id="sidebar">
      <div className="sidebar__content ">
        <ul className="sidebar-content__list">
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3 ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <Link
                to="/"
                className={({ isActive }) =>
                  isActive ? `sidebar-active py-2 w-100` : ""
                }
              >
                <span>
                  {" "}
                  <HomeIcon className="sidebar-content__icon" />
                </span>
                <span
                  className={`sidebar-content__list-item-text ${
                    context.collapsed ? "inactive" : ""
                  }`}
                >
                  Home
                </span>
              </Link>
            </div>
          </li>

          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3   ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <ExploreIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Explore
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <SubscriptionsIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Subscriptions
              </span>
            </div>
          </li>
        </ul>
        <hr className="text-white fs-2 my-4" />
        <ul
          className={`${
            subscribes.length ? "sidebar-content__list" : "inactive"
          }`}
        >
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <VideoLibraryIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Library
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <HistoryIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                History
              </span>
            </div>
          </li>

          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <SmartDisplayOutlinedIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Your Videos
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <AccessTimeOutlinedIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Watch Later
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <ThumbUpAltOutlinedIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Liked Videos
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <PlaylistPlayIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Favorites
              </span>
            </div>
          </li>
        </ul>

        {/* subscribation */}
        <ul
          className={`${
            subscribes.length ? "sidebar-content__list" : "inactive"
          }`}
        >
          <hr className="text-white fs-2 my-4" />
          <p className={context.collapsed ? "" : "sidebar__title"}>
            {context.collapsed ? "" : "SUBSCRIPTIONS"}
          </p>
          {subscribes.length &&
            subscribes.slice(0, 4).map((subscribe) => (
              <li key={subscribe.id} className="sidebar-content__list-item">
                <div
                  className={` d-flex align-items-center ps-3 ${
                    context.collapsed
                      ? "justify-content-center"
                      : "justify-content-start"
                  }`}
                >
                  <img
                    src={`${subscribe.snippet.thumbnails.high.url}`}
                    className="sidebar-subscriptions__image"
                  />
                  <span
                    className={`sidebar-content__list-item-text ${
                      context.collapsed ? "inactive" : ""
                    }`}
                  >
                    {" "}
                    {subscribe.snippet.title}
                  </span>
                </div>
              </li>
            ))}

          <Accordion
            className={`${
              subscribes.length >= 5 ? "accordion w-100" : "inactive"
            } `}
          >
            <Accordion.Item eventKey="0" className="accordion-items-content ">
              <Accordion.Header>{`Show ${
                subscribes.length - 4
              } More`}</Accordion.Header>
              <Accordion.Body className="accordion-body-items-content">
                {subscribes.length &&
                  subscribes.slice(4, subscribes.length).map((subscribe) => (
                    <li
                      key={subscribe.id}
                      className="sidebar-content__list-item"
                    >
                      <div
                        className={` d-flex align-items-center ps-3 ${
                          context.collapsed
                            ? "justify-content-center"
                            : "justify-content-start"
                        }`}
                      >
                        <img
                          src={`${subscribe.snippet.thumbnails.high.url}`}
                          className="sidebar-subscriptions__image"
                        />
                        <span
                          className={`sidebar-content__list-item-text ${
                            context.collapsed ? "inactive" : ""
                          }`}
                        >
                          {" "}
                          {subscribe.snippet.title}
                        </span>
                      </div>
                    </li>
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <hr className="text-white fs-2 my-4" />
        </ul>
        {/* explore */}
        <p className={context.collapsed ? "" : "sidebar__title"}>
          {context.collapsed ? "" : "Explore"}
        </p>
        <ul className="sidebar-content__list">
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <LocalFireDepartmentOutlinedIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Trending
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <MusicNoteIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Music
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <MovieIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Movie
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <VideogameAssetIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Gaming
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <FeedIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                News
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <EmojiEventsIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Sports
              </span>
            </div>
          </li>
        </ul>
        <hr className="text-white fs-2 my-4" />
        <ul className="sidebar-content__list">
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <SettingsIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Settings
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <FlagIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Report history
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <HelpOutlineIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Help
              </span>
            </div>
          </li>
          <li className="sidebar-content__list-item ">
            <div
              className={` d-flex align-items-center ps-3  ${
                context.collapsed
                  ? "justify-content-center"
                  : "justify-content-start"
              }`}
            >
              <span>
                {" "}
                <FeedbackIcon className="sidebar-content__icon" />
              </span>
              <span
                className={`sidebar-content__list-item-text ${
                  context.collapsed ? "inactive" : ""
                }`}
              >
                Send feedback
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
