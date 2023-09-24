import React, { useState, useContext, useEffect, useRef } from "react";
import { api_key } from "../utils/utils.jsx";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./header.css";
import { Button, Modal } from "react-bootstrap";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import {GoogleOAuthProvider } from '@react-oauth/google';
import Login from "../login/Login.jsx";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

export default function Header() {
  let navigate = useNavigate();
  let searchResultBox = useRef();
  let params = useLocation();
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [videoSearchResult, setVideoSearchResult] = useState(null);
  const [tokenLogin , setTokenLogin] = useState('')
  let context = useContext(ChannelDetailsContext);
  let clientID = "563530907251-hmcv32krv4fovjsrcqaiml4v2s8f0v2m.apps.googleusercontent.com"

  const menuCollaps = () => {
    context.setCollapsed(!context.collapsed);
  };

  const searchingItem = async (searchItem) => {
    searchValue &&
      (await setSearchValue(searchItem),
      await searchHandel(),
      (searchResultBox.current.style.display = "none"),
      navigate(`/videoSearch/${searchValue}`));
  };

  const searchHandel = () => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: api_key,
          q: searchValue,
          part: "snippet",
          maxResults: 10, // تعداد نتایج مورد نظر را تنظیم کنید
          type: "video",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSearchResult(res.data.items);
          console.log("video search result ", res.data);
          context.setVideoSearchResult(res.data);
        }
      });
  };

  useEffect(() => {
    let tokenL = JSON.parse(localStorage.getItem("token"));

    console.log('token' , tokenL);

    if (tokenL) {
      axios
        .get(`https://www.googleapis.com/youtube/v3/channels`, {
          params: {
            part: "snippet",
            mine: true,
            access_token:tokenL.token
          },
          headers: {
            Authorization: `Bearer ${tokenL.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            context.setMyData(res.data.items);
            context.setIsLogin(true);
          }
        }).catch(err=>{
          console.log('err',err.response);
        })
    }
  }, [context.isLogin]);

  useEffect(() => {
    searchResultBox.current.style.display = "block";
    searchHandel();
  }, [searchValue]);

  return (
    <>
      <header>
        <div className="container-fluid header-content">
          <div className="header__left d-flex  ">
            <div className="header-left__icon-box d-flex align-items-center justify-content-center ">
              <MenuIcon
                className="header-left__menu-icon"
                onClick={menuCollaps}
              />
            </div>
            <div className="header-left__logo">
              <Link to="/">
                <img
                  src="./images/logo/Youtube-Logo.svg"
                  className="header-left__logo-image"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="header-searchBox">
            <div className="header__center">
              <div className="header-center__search-box">
                <input
                  type="text"
                  className="header-center__search-input"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search"
                />
                <SearchIcon
                  className="header-center__search-icon"
                  onClick={() => searchingItem(searchValue)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="header-center__voice ">
                <KeyboardVoiceIcon className="header-center__voice-icon " />
              </div>
            </div>

            <div className="header-center__search-result" ref={searchResultBox}>
              {searchResult && searchValue &&(
              searchResult.map(searchItem=>(

                <Link key={searchItem.id.videoId} className="header-center__search-result-item" 
                  onClick={()=>searchingItem(searchItem.snippet.title.replace(/\p{Emoji}/gu, ''))}>
                  <span><SearchIcon  className="fs-1 "/></span>
                  {searchItem.snippet.title.replace(/\p{Emoji}/gu, '')}
                </Link>
              ))
             
            )}
            
            </div>
          </div>
          <div className="header__right">
            <div className="header-right__search ">
              <SearchIcon
                className="header-center__search-icon"
                onClick={() => setShow(true)}
              />
            </div>

            <div className="header-right__create ">
              <img
                src="../../../public/images/create.svg"
                alt=""
                className="header-right__create-img"
              />
            </div>
            <div className="header-right__apps">
              <AppsIcon className="header-right__apps-icon" />
            </div>
            <div className="header-right__notification">
              <NotificationsIcon className="header-right__notification-icon" />
            </div>
            <div
              className="header-right__profile "
              style={{ cursor: "pointer" }}
            >
              {context.myData.length ? (
                <img
                  src={`${context.myData[0].snippet.thumbnails.high.url}`}
                  alt=""
                  className="header-right__profile-img"
                />
              ) : (
                <>
                   <GoogleOAuthProvider 
                     clientId="563530907251-hmcv32krv4fovjsrcqaiml4v2s8f0v2m.apps.googleusercontent.com"
                    >
                    <Login />
                   </GoogleOAuthProvider>
                  
                 
                    </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ________ start modal search-box_________ */}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <div className="container-fluid Modal-search-box">
            <input type="text" className="modal-input" placeholder="Search" />
            <SearchIcon className="modal-input__search-icon" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            show result
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ________ Finish modal search-box_________ */}
    </>
  );
}
