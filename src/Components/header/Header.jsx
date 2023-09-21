import React, { useState, useContext, useEffect, useRef } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { api_key } from "../utils/utils.jsx";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import queryString from "query-string";
import "./header.css";
import { Button, Modal } from "react-bootstrap";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import { LoginSocialGoogle } from "reactjs-social-login";
import jwtDecode from "jwt-decode";

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
  let context = useContext(ChannelDetailsContext);

  const menuCollaps = () => {
    context.setCollapsed(!context.collapsed);
  };

  const login = async (event) => {
    event.preventDefault();
    const clientId =
      "424691366405-fgkp2u99f96rf4cbv4pcui0ml0u5kng7.apps.googleusercontent.com";
    const redirectUri = "http://localhost:5173"; // باید ادرس فایل رو آدرس پروژه خود وارد کنید
    const scope = "https://www.googleapis.com/auth/youtube";
    await (window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&include_granted_scopes=true`);
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
    let token = JSON.parse(localStorage.getItem("token"));

    console.log(token);

    if (token) {
      axios
        .get(`https://www.googleapis.com/youtube/v3/channels`, {
          params: {
            part: "snippet",
            mine: true,
            access_token: token.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            context.setMyData(res.data.items);
            context.setIsLogin(true);
          }
        });
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
                <LoginSocialGoogle
                  isOnlyGetToken
                  client_id={
                    "424691366405-fgkp2u99f96rf4cbv4pcui0ml0u5kng7.apps.googleusercontent.com"
                  }
                  onLoginStart={(event) => login(event)}
                  onResolve={({ data }) => {
                    console.log("success data", data);
                    let token = data.access_token;
                    localStorage.setItem(
                      "token",
                      JSON.stringify({ token: data.access_token })
                    ),
                      context.setIsLogin(true);
                  }}
                  onReject={(err) => {
                    console.log("err", err);
                  }}
                >
                  <img
                    src="../../../public/images/logo/download.png"
                    className="header-right__profile-img"
                    alt=""
                  />
                </LoginSocialGoogle>
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
