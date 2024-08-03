import { useRoutes } from "react-router-dom";
// import "./App.scss";
import routeConfig from "./router.jsx";

function App() {
	const routes = useRoutes(routeConfig);
	return <div className="app">{routes}</div>;
}

export default App;
