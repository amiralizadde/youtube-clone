import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {

  const [myData , setMyData] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const [isLogin , setIsLogin] = useState(false)
  const [videoSearchResult , setVideoSearchResult] = useState({})
  const[ token ,setToken ] = useState(null)

  return (
    <DataContext.Provider
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
    </DataContext.Provider>
  );
};

export default DataContextProvider;
