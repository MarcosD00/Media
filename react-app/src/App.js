import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import CreatePost from "./components/createPost";
import SingleUserPost from "./components/Post/singlePost"
import PostComponent from "./components/Post";
import Navigation from "./components/Navigation";
import AllComments from "./components/Comment"
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <AuthPage />
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
          <Route exact path="/comment">
            <AllComments />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
