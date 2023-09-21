import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import ChannelDetailsProvider from './contexts/ChannelDetailsContext.jsx'


import './styles/reset.css'
import './styles/fonts.css'
import './styles/variables.css'
import './styles/default.css'
import './styles/helpers.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
     <ChannelDetailsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </ChannelDetailsProvider>
  //  </React.StrictMode>,
);
