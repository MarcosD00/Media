import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { singlePost } from "../../store/posts";
import AllComments from "../Comment"
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePost"
import CreateComment from "../createComment"
import UpdatePost from "../UpdatePost"
import "./post.css"

const SingleUserPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.singlePost)

    useEffect(() => {
        dispatch(singlePost(postId))
    }, [dispatch, postId])

    const us = useSelector(state => state.session.user)
    let user;
    if (us) {
        user = us.id
    }

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="main-post-page">
            <div className="display-all-containers">
                <div className="single-container">
                    <h1>{post.title}</h1>
                    <div className="post-user-container">
                        <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                        <p className="post-user-name name-display">{post.User_firstName} {post.User_lastName}</p>
                    </div>
                    <p>{post.created_at}</p>
                </div>
                <div className="single-clap-comment-container">
                    <i className="single-clap-comment clap-comment fa-regular fa-comment" />
                    <p className="single-clap-comment">108</p>
                </div>
                <div className="single-container-body">
                    <img className="single-container-photo" src={post.photo }/>
                    <p className="post-sotry">{post.story}</p>
                    <div className="inside-container-clap-comment">
                        {/* <i className="single-clap-comment clap-comment fa-regular fa-comment"/> */}
                        {/* <OpenModalButton
                            buttonText= {<i className="single-clap-comment clap-comment fa-regular fa-comment"/>}
                            className="all-delete-btn delete-update-btn"
                            modalComponent={<CreateComment id={post.id} />}
                            />
                        <p className="single-clap-comment">108</p> */}
                        {user && post.owner_id === user && <OpenModalButton
                                buttonText="Edit"
                                className="all-update-btn delete-update-btn"
                                modalComponent={<UpdatePost id={post.id} />}
                            />}
                        {user && post.owner_id === user && <OpenModalButton
                                buttonText="Delete"
                                className="all-delete-btn delete-update-btn"
                                modalComponent={<DeletePost id={post.id}><Redirect to="/" /></DeletePost>}
                            />}
                    </div>
                </div>
                <CreateComment />
                {/* <AllComments /> */}
            </div>
        </div>
    )
}
export default SingleUserPost;