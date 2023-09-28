import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./header.css";
import { Button, Modal } from "react-bootstrap";
import { ChannelDetailsContext } from "../../contexts/ChannelDetailsContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "../login/Login.jsx";
import { videoSearch } from "../../services/Axios/requests/Search.jsx";
import { getMyChannel } from "../../services/Axios/requests/Channels.jsx";
import swal from "sweetalert";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

export default function Header() {
  let navigate = useNavigate();
  let searchResultBox = useRef();
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [videoSearchResult, setVideoSearchResult] = useState(null);
  const [tokenLogin, setTokenLogin] = useState("");
  let context = useContext(ChannelDetailsContext);
  let clientID ="150213684481-hc2e94ups8stmqq4clv99bc4vmleu0ta.apps.googleusercontent.com";

  const menuCollaps = () => {
    context.setCollapsed(!context.collapsed);
  };

  const searchingItem = async (searchItem) => {

    searchValue &&
      (await setSearchValue(searchItem),
      await searchHandel(),
      context.setVideoSearchResult(searchResult),
      (searchResultBox.current.style.display = "none"),
      navigate(`/videoSearch/${searchValue}`));
  };

    const searchHandel = () => {
      console.log('search handel');
      videoSearch(searchValue)
        .then((res) => {
          setSearchResult(res.items);
          // context.setVideoSearchResult(res);
        })
        .catch((err) =>
          swal({
            text: err,
            icon: "warning",
            dangerMode: true,
          })
        );
    };

  // recive my channel data
  useEffect(() => {
    let tokenL = JSON.parse(localStorage.getItem("token"));
    console.log("tokenL", tokenL);

    if (tokenL) {
      getMyChannel(tokenL.token)
        .then((res) => {
          context.setMyData(res.items);
          context.setIsLogin(true);
        })
        .catch((err) =>
          swal({
            text: err,
            icon: "warning",
            dangerMode: true,
          })
        );
    }
  }, [context.isLogin]);

  useEffect(() => {
    searchResultBox.current.style.display = "block";
    searchValue.length > 0 && searchHandel();
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
                  src="../../../public/images/logo/Youtube-Logo.svg"
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
              {searchResult &&
                searchValue &&
                searchResult.map((searchItem) => (
                  <Link
                    key={searchItem.id.videoId}
                    className="header-center__search-result-item"
                    onClick={() =>
                      searchingItem(
                        searchItem.snippet.title.replace(/\p{Emoji}/gu, "")
                      )
                    }
                  >
                    <span>
                      <SearchIcon className="fs-1 " />
                    </span>
                    {searchItem.snippet.title.replace(/\p{Emoji}/gu, "")}
                  </Link>
                ))}
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
                  <GoogleOAuthProvider clientId="150213684481-hc2e94ups8stmqq4clv99bc4vmleu0ta.apps.googleusercontent.com">
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
        <Modal.Body className="position-relative">
          <div className="container-fluid Modal-search-box">
            <input
              type="text"
              className="modal-input"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search"
            />
            <SearchIcon
              className="modal-input__search-icon"
              onClick={() => {
                setShow(false);
                searchingItem(searchValue);
              }}
            />
          </div>
          <div className="search-result__modal" ref={searchResultBox}>
            {searchResult &&
              searchValue &&
              searchResult.map((searchItem) => (
                <Link
                  key={searchItem.id.videoId}
                  className="header-center__search-result-item"
                  onClick={() =>
                    searchingItem(
                      searchItem.snippet.title.replace(/\p{Emoji}/gu, ""),
                      setShow(false)
                    )
                  }
                >
                  <span>
                    <SearchIcon className="fs-1 " />
                  </span>
                  {searchItem.snippet.title.replace(/\p{Emoji}/gu, "")}
                </Link>
              ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* ________ Finish modal search-box_________ */}
    </>
  );
}
