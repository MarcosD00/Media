import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import CreatePost from "./components/CreatePost";
import SingleUserPost from "./components/Post/singlePost"
import PostComponent from "./components/Post";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  //some comment to push to git
  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <AuthPage />
          </Route>
          <Route exact path="/">
            <PostComponent />
          </ Route>
          <Route path="/new-post">
            <CreatePost />
          </Route>
          <Route exact path="/post/:postId">
            <SingleUserPost />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
