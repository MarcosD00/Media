import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allPosts } from "../../store/posts";
import "./post.css"
import OpenModalButton from "../OpenModalButton";


const PostComponent = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allPosts())
        
    }, [dispatch]);

    
    const posts = useSelector(state => Object.values(state.posts.allPosts))
    const us = useSelector(state => state.session.user)
    let user;
    if (us) {
        user = us.id
    }

    // console.log(posts)

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="main-post-page">
            <div className="display-all-containers">
                {posts.map(ele =>
                <NavLink exact to={`/post/${ele.id}`}>
                    <div className="single-container" key={ele.id}>
                        <div className="post-user-container">
                            <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                            <p className="post-user-name">{ele.User_firstName} {ele.User_lastName} · {ele.created_at}</p>
                        </div>
                        <div className="display-info-container">
                            <div className="story-title-and-description">
                                <p>{ele.title}</p>
                            </div>
                            <div>
                                <img className="post-story-img" src={ele.photo}/>
                            </div>
                        </div>   
                    </div>
                </NavLink>
                )}
            </div>
        </div>
    )
}
export default PostComponent;