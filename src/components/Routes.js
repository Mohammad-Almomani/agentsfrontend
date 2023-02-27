import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Copyright from "./CopyRight";
import MenuAppBar from "./navbar";
import { useEffect } from "react";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";
import cookies from "react-cookies";
import AddPostForm from "./Add-item-form";

function AppRoutes() {
  const { isAuthorized, checkToken } = useLoginContext();

  const { gitPosts } = usePostContext();

  useEffect(() => {
    gitPosts();
    if (cookies.load("token")) {
      checkToken();
      gitPosts();
    }
  }, [isAuthorized]);

  return (
    <div className="App" data-testid="homePage">
      <>
        <Router>
          <MenuAppBar />
          <Routes>
            <Route
              path="/signup/*"
              element={isAuthorized ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/signin/*"
              element={isAuthorized ? <Navigate to="/" /> : <SignIn />}
            />
              <Route
                path="/listItem/*"
                element={isAuthorized ? <AddPostForm /> : <Navigate to="/signin" />}
              />
            <Route
              path="/*"
              // element={isAuthorized ? <Post /> : <Navigate to="/signin" />}
              element={<Items />}
            />
          </Routes>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Router>
      </>
    </div>
  );
}

export default AppRoutes;
