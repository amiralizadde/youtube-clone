import Home from "./Pages/Index/Home.jsx";
import Channel from "./Pages/channel/Channel.jsx";
import VideoPlay from "./Pages/video/VideoPlay.jsx";
import SearchVideo from './Pages/searchVideo/SearchVideo.jsx'

import Index from "./Pages/channel/index/Index.jsx";

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/channel/:channelID/*",
    element: <Channel />,
    children: [
      { path: "", element: <Index />}
    ],
  },
  { path: "/video/:videoID", element: <VideoPlay /> },
  { path: "/videoSearch/:searchValue", element: <SearchVideo /> },
];

export default routes;
