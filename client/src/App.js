import {useState, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import {useAuth0} from "@auth0/auth0-react";
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
import CreateCategory from "./pages/createCategory/CreateCategory";
import AdminCategories from "./pages/adminCategories/AdminCategories";
import AdminUnderReview from "./pages/adminUnderReview/AdminUnderReview";
import CategoriesComponent from "./pages/categories/CategoriesComponent";
import About from "./pages/about/About";

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
        path: "forums/createcategory",
        element: <CreateCategory />,
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

function App() {
  //   const {user, isAuthenticated, isLoading} = useAuth0();
  //   const [loaded, isLoaded] = useState(isLoading);

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
