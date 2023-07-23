import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allPosts } from "../../store/posts";
import DeletePost from "../DeletePost"
import OpenModalButton from "../OpenModalButton";
import UpdatePost from "../UpdatePost"
import "./post.css"


const PostComponent = () => {
    const posts = useSelector(state => Object.values(state.posts.allPosts))
    const us = useSelector(state => state.session.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allPosts())
        
    }, [dispatch, posts]);

    
    let user;
    if (us) {
        user = us.id
    }

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/landing" />;

    return (
        <div className="main-post-page">
            <div className="display-all-containers">
                {posts.map(ele =>
                    <div className="single-container"  key={ele.id}>
                        <NavLink className="single-post" exact to={`/post/${ele.id}`}>
                                <div className="post-user-container">
                                    <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                                    <p className="post-user-name name-display">{ele.User_firstName} {ele.User_lastName} · {ele.created_at}</p>
                                </div>
                                <div className="display-info-container">
                                    <div className="story-title-and-description">
                                        <h3 className="story-title">{ele.title}</h3>
                                        <p className="story-description">{ele.story}</p>
                                    </div>
                                    <div>
                                        <img className="post-story-img" src={ele.photo}/>
                                    </div>
                                </div>   
                        </NavLink>
                        <div>
                        {user && ele.owner_id === user && <OpenModalButton
                            buttonText="Edit"
                            className="all-update-btn delete-update-btn"
                            modalComponent={<UpdatePost id={ele.id} />}
                            />}                
                        {user && ele.owner_id === user && <OpenModalButton
                            buttonText="Delete"
                            className="all-delete-btn delete-update-btn"
                            modalComponent={<DeletePost id={ele.id} />}
                            />}
                    
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default PostComponent;