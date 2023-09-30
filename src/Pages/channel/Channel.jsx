import React, { useEffect, useState } from "react";
import "./channel.css";
import {  convertNumber } from "../../Components/utils/utils.jsx";
import { useParams } from "react-router-dom";
import Index from "./index/Index.jsx";
import { channelInformation } from "../../services/Axios/requests/Channels.jsx";
import BeatLoader from "react-spinners/BeatLoader";

export default function Channel() {
  let params = useParams();
  const [channelDetails, setChannelDetails] = useState("");
  const [subscribeCount , setSubScribeCount] = useState(0)



  useEffect(() => {
    channelInformation(params.channelID)
    .then((res) =>{
        setChannelDetails(res);
        setSubScribeCount(convertNumber(res.items[0].statistics.subscriberCount))
    });
  }, []);

  return (
    <>
      {channelDetails ? (
        <div className="channel">
          <header className="channel-header  ">
            <div className="channel-header__top-bar  ">
              <div className="channel-header__topbar-image-container    ">
                <img
                  src={
                    channelDetails.items[0].brandingSettings.image
                      ? `${channelDetails.items[0].brandingSettings.image.bannerExternalUrl}`
                      : "../../../public/images/default_banner.jpg"
                  }
                  className="channel-header__topbar-image"
                />
              </div>

              <div className="channel-header__topbar-infoChannel   p-3 ">
                <div className="channel-header__topbar-infoChannel-right">
                  <button className="channel-header__topbar-infoChannel-btn">
                    subscribe
                  </button>
                </div>

                <div className="channel-header__topbar-infoChannel-left">
                  <div className="chanchannel-header__topbar-infoChannel-profile  ">
                    <img
                      src={`${channelDetails.items[0].snippet.thumbnails.high.url}`}
                      className="chanchannel-header__topbar-infoChannel-profile-image img-fluid"
                      alt=""
                    />
                  </div>

                  <div className="mx-4">
                    <p className="chanchannel-header__name">{channelDetails.items[0].snippet.title}</p>
                    <p className="chanchannel-header__number-subscribe">{subscribeCount} subscriber</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="channel-content">
            <div className="container-fluid">
              <Index />
            </div>
          </section>
        </div>
      ) : (
        <div><BeatLoader color="white" /></div>
      )}
    </>
  );
}
