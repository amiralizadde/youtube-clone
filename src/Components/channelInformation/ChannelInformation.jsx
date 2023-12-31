import React, { useEffect, useState } from "react";
import "./channelInformation.css";
import { convertNumber } from "../utils/utils.jsx";
import { Link } from "react-router-dom";

export default function ChannelInformation({ dataChannel }) {
  const [subScribeCount, setSubScribeCount] = useState("");

  useEffect(() => {
    console.log('dataChannel ' ,dataChannel);
    setSubScribeCount(
      convertNumber(dataChannel.items[0].statistics.subscriberCount)
    );
  }, []);

  return (
    <>
        <div id="channelInfo">
          <div className="channel-header__topbar-infoChannel   p-3 ">
            <div className="channel-header__topbar-infoChannel-right">
              <button className="channel-header__topbar-infoChannel-btn">
                subscribe
              </button>
            </div>

            <div className="channel-header__topbar-infoChannel-left">
              <div className="chanchannel-header__topbar-infoChannel-profile  ">
               <Link to={`/channel/${dataChannel.items[0].id}`}>
                  <img
                    src={`${dataChannel.items[0].snippet.thumbnails.high.url}`}
                    className="chanchannel-header__topbar-infoChannel-profile-image img-fluid"
                    alt=""
                  />
                </Link>
              </div>

              <div className="mx-4">
                <p className="chanchannel-header__name">
                  {dataChannel.items[0].snippet.title}
                </p>
                <p className="chanchannel-header__number-subscribe">
                  {subScribeCount} subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
