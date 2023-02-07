import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Router,
} from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import NavbarComponent from "./components/NavbarComponent";
import Profile from "./pages/profile/Profile";
import Header from "./pages/header/Header";
import GamesComponent from "./pages/games/GamesComponent";
import EntertainmentComponent from "./pages/entertainment/EntertainmentComponent";
import SportsComponent from "./pages/sports/SportsComponent";
import TechComponent from "./pages/tech/TechComponent";
import LifestyleComponent from "./pages/lifestyle/LifestyleComponent";
import HomeComponent from "./pages/home/HomeComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "forums/games",
        element: <GamesComponent />,
      },
      {
        path: "forums/entertainment",
        element: <EntertainmentComponent />,
      },
      {
        path: "forums/sports",
        element: <SportsComponent />,
      },
      {
        path: "forums/tech",
        element: <TechComponent />,
      },
      {
        path: "forums/lifestyle",
        element: <LifestyleComponent />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="mainBg">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
