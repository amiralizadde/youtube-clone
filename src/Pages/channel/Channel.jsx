import React, { useEffect, useState } from "react";
import "./channel.css";
import { channelInfos , convertNumber } from "../../Components/utils/utils.jsx";
import { useParams, Outlet, Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import 'swiper/css/navigation';
import { FreeMode, Pagination , Navigation } from "swiper/modules";
import Index from "./index/Index.jsx";

export default function Channel() {
  let params = useParams();
  const [channelDetails, setChannelDetails] = useState("");
  const [subscribeCount , setSubScribeCount] = useState(0)

  useEffect(() => {
    console.log("channelDetails ", channelDetails);
  }, [channelDetails]);

  useEffect(() => {
    console.log(" params :", params.channelID);
    let channelInfo = channelInfos(params.channelID);
    channelInfo.then((res) => {
      if (res.status === 200) {
        console.log('res channelInfo' , res.data);
        setChannelDetails(res.data);
        setSubScribeCount(convertNumber(res.data.items[0].statistics.subscriberCount))
      }
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

            {/* <div className="channel-header__nav-bar border ">
              <Swiper
                slidesPerView={3}
                breakpoints={{
                  640: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 5,
                  },
                  991:{
                    slidesPerView:7,
                  }
                }}
                navigation={true} modules={[Navigation , FreeMode]}
                className="mySwiper channel-header__nav-bar-list text-white my-3 "
              >
                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="" end className="channel-header__nav-bar-link">HOME</NavLink>
                </SwiperSlide>

                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="videos" className="channel-header__nav-bar-link">  VIDEOS</NavLink>
                </SwiperSlide>

                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="playlists"className="channel-header__nav-bar-link">PLAYLISTS</NavLink>
                </SwiperSlide>

                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="community"className="channel-header__nav-bar-link">COMMUNITY</NavLink>
                </SwiperSlide>

                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="channels" className="channel-header__nav-bar-link">CHANNELS</NavLink>
                </SwiperSlide>

                <SwiperSlide className="channel-header__nav-bar-list-item">
                  <NavLink to="about" className="channel-header__nav-bar-link"> ABOUT</NavLink>
                </SwiperSlide>
                
                <SwiperSlide className="channel-header__nav-bar-list-item">
                  SEARCH
                </SwiperSlide>
              </Swiper>
            </div> */}
          </header>

          <section className="channel-content">
            <div className="container-fluid">
              {/* <Outlet /> */}
              <Index />
            </div>
          </section>
        </div>
      ) : (
        <div>pleade waiting.......</div>
      )}
    </>
  );
}
