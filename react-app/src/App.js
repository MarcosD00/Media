import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import CreatePost from "./components/createPost";
import SingleUserPost from "./components/Post/singlePost"
import LandingPage from "./components/LandingPage"
import PostComponent from "./components/Post";
import Navigation from "./components/Navigation";
import AllComments from "./components/Comment";
import AboutMe from "./components/AboutMe";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation()
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let pageBackgroundColor

	if(location.pathname === "/landing"){
		pageBackgroundColor = 'landing-container-color'
	} else {
		pageBackgroundColor = 'landing-page-container'
	}

  return (
    <>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
          <Route exact path="/landing">
            <div className={pageBackgroundColor}>
              <LandingPage />
            </div>
            <AboutMe />
            </Route>
            <Route exact path="/">
              <PostComponent />
            </ Route>
            <Route exact path="/new-post">
              <CreatePost />
            </Route>
            <Route exact path="/post/:postId">
              <SingleUserPost />
            </Route>
            <Route exact path="/comment/post/:postId">
              <AllComments />
            </Route>
          </Switch>
        )}
    </>
  );
}

export default App;
