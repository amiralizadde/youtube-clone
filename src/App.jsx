import react, { useContext } from "react";
import "./App.css";

import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import Header from "./Components/header/Header.jsx";
import Sidebar from "./Components/sidebar/Sidebar.jsx";
import { DataContext } from "./contexts/DataContext.jsx";

function App() {
  let router = useRoutes(routes);
  let context = useContext(DataContext);

  return (
    <>
      <div>
        <Header />
          <div className="row home-content">
            <div
              className={`aside-content mt-5   ${
                context.collapsed
                  ? `col-2  col-lg-1`
                  : "col-4 col-sm-4 col-md-3 col-lg-2 "
              }`}
            >
              <Sidebar />
            </div>
            <div
              className={` router-content ${
                context.collapsed
                  ? `col-10  col-lg-11`
                  : "col-8 col-md-9  col-lg-10"
              }`}
            >
              {router}
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
