import Home from "./Pages/Index/Home.jsx";
import Channel from "./Pages/channel/Channel.jsx";
import VideoPlay from "./Pages/video/VideoPlay.jsx";
import SearchVideo from './Pages/searchVideo/SearchVideo.jsx'

import Index from "./Pages/channel/index/Index.jsx";
import Videos from "./Pages/channel/videos/Videos.jsx";
import PlayLists from './Pages/channel/playlists/PlayLists.jsx'
import About from './Pages/channel/about/About.jsx'
import Channels from './Pages/channel/channels/Channels.jsx'
import Community from './Pages/channel/community/Community.jsx'

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/channel/:channelID/*",
    element: <Channel />,
    children: [
      { path: "", element: <Index />},
      { path: "videos", element: <Videos /> },
      { path: "playlists", element: <PlayLists /> },
      { path: "community", element: <Community /> },
      { path: "channels", element: <Channels /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/video/:videoID", element: <VideoPlay /> },
  { path: "/videoSearch/:searchValue", element: <SearchVideo /> },
];

export default routes;
