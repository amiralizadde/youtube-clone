import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ChannelDetailsContext = createContext();

const ChannelDetailsProvider = ({ children }) => {

  const [myData , setMyData] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const [isLogin , setIsLogin] = useState(false)
  const [videoSearchResult , setVideoSearchResult] = useState({})
  const[ token ,setToken ] = useState(null)

  return (
    <ChannelDetailsContext.Provider
      value={{
        collapsed,
        setCollapsed,
        myData,
        setMyData,
        isLogin,
        setIsLogin,
        token,
        setToken,
        videoSearchResult,
        setVideoSearchResult
      }}
    >
      {children}
    </ChannelDetailsContext.Provider>
  );
};

export default ChannelDetailsProvider;
