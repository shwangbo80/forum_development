import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "./pages/main/Main";
import Header from "./pages/header/Header";
import GamesComponent from "./pages/games/GamesComponent";
import EntertainmentComponent from "./pages/entertainment/EntertainmentComponent";
import SportsComponent from "./pages/sports/SportsComponent";
import TechComponent from "./pages/tech/TechComponent";
import LifestyleComponent from "./pages/lifestyle/LifestyleComponent";
import HomeComponent from "./pages/home/HomeComponent";
import UserForm from "./pages/userform/UserForm";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import CreatePost from "./pages/createPost/CreatePost";
import PostComponent from "./pages/posts/PostComponent";
import CreateComment from "./pages/createComment/CreateComment";
import CreateTopic from "./pages/createTopic/CreateTopic";

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
      {
        path: "forums/post",
        element: <PostComponent />,
      },
      {
        path: "forums/createTopic",
        element: <CreateTopic />,
      },
      {
        path: "forums/createpost",
        element: <CreatePost />,
      },
      {
        path: "forums/createComment",
        element: <CreateComment />,
      },
      {
        path: "forums/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "userform",
    element: <UserForm />,
  },
]);

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [loaded, isLoaded] = useState(isLoading);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     return;
  //   } else {
  //     if (isAuthenticated && user.user_metadata.role === "admin") {
  //       localStorage.setItem("user", JSON.stringify(user));
  //       const savedUser = localStorage.getItem("user");
  //       const userJson = JSON.parse(savedUser);
  //     } else {
  //       console.log("is not admin");
  //     }
  //   }
  // }, [isAuthenticated]);

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
