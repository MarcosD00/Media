import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { singlePost } from "../../store/posts";
import "./post.css"

const SingleUserPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.singlePost)

    useEffect(() => {
        dispatch(singlePost(postId))
    }, [dispatch, postId])

    const us = useSelector(state => state.session.user)

    const sessionUser = useSelector((state) => state.session.user);
    console.log(post)
    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="main-post-page">
            <div className="display-all-containers">
                <div className="single-container">
                    <h1>{post.title}</h1>
                    <div className="post-user-container">
                        <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                        <p className="post-user-name">{post.User_firstName} {post.User_lastName}</p>
                    </div>
                    <p>{post.created_at}</p>
                </div>
                <div className="single-clap-comment-container">
                    <i class="single-clap-comment clap-comment fa-solid fa-hands-clapping" />
                    <p class="single-clap-comment">64</p>
                    <i class="single-clap-comment clap-comment fa-regular fa-comment" />
                    <p class="single-clap-comment">108</p>
                </div>
                <div className="single-container-body">
                    <img className="single-container-photo" src={post.photo }/>
                    <p className="post-sotry">{post.story}</p>
                    <div className="inside-container-clap-comment">
                        <i class="single-clap-comment clap-comment fa-solid fa-hands-clapping" />
                        <p class="single-clap-comment">64</p>
                        <i class="single-clap-comment clap-comment fa-regular fa-comment" />
                        <p class="single-clap-comment">108</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleUserPost;