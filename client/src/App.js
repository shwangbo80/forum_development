import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "./pages/main/Main";
import Header from "./pages/header/Header";
import HomeComponent from "./pages/home/HomeComponent";
import UserForm from "./pages/userform/UserForm";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import TopicComponent from "./pages/topic/TopicComponent";
import CreatePost from "./pages/createPost/CreatePost";
import PostComponent from "./pages/posts/PostComponent";
import CreateComment from "./pages/createComment/CreateComment";
import AdminCategories from "./pages/adminCategories/AdminCategories";
import AdminUnderReview from "./pages/adminUnderReview/AdminUnderReview";
import CategoriesComponent from "./pages/categories/CategoriesComponent";
import About from "./pages/about/About";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Main />,
    },
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <HomeComponent />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "forums/categories",
          element: <CategoriesComponent />,
        },
        {
          path: "forums/topic/:id",
          element: <TopicComponent />,
        },
        {
          path: "forums/post/:id",
          element: <PostComponent />,
        },

        {
          path: "forums/createpost/:id",
          element: <CreatePost />,
        },
        {
          path: "forums/createComment",
          element: <CreateComment />,
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              path: "",
              element: <AdminCategories />,
            },
            {
              path: "underreview",
              element: <AdminUnderReview />,
            },
          ],
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

  return (
    <div className="App">
      <div>{/* <Header /> */}</div>
      <div className="mainBg">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
