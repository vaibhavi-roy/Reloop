import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Return from "./Pages/Return";
import Exchange from "./Pages/Exchange";
import Tracker from "./Pages/Tracker";
// import { RouteObject } from "react-router-dom";

const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/return",
        element: <Return />,
      },
      {
        path: "/exchange",
        element: <Exchange />,
      },
      {
        path: "/tracker",
        element: <Tracker />,
      },
      {
        path: "*",
        element: <>{"Route doesn't exists"}</>,
      },
    ],
  },
];

export default routeConfig;
