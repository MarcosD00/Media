import React, {  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { singlePost } from "../../store/posts";
import PostDate from "../PostDate";
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
    if (!sessionUser) return <Redirect to="/landing" />;

    return (
        <div className="main-post-page">
            <div className="display-all-containers">
                <div className="single-container">
                    <h1 className="single-post-title">{post.title}</h1>
                    <div className="post-user-container">
                        <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                        <p className="post-user-name name-display">{post.User_firstName} {post.User_lastName}</p>
                    </div>
                    <p>{<PostDate date={post.created_at} />}</p>
                </div>
                <div className="single-clap-comment-container">
                <OpenModalButton
                            buttonText={<i className="single-clap-comment clap-comment fa-regular fa-comment"/>}
                            className="create-comment-btn"
                            modalProps={{hAlign: "right", className: "modal-create-comment", id: "modal-background"}}
                            modalComponent={<CreateComment postId={post.id}
                            />}
                            /> 
                </div>
                <div className="single-container-body">
                    <img className="single-container-photo" src={post.photo }/>
                    <p className="post-sotry">{post.story}</p>
                    <div className="inside-container-clap-comment">
                        {/* <i className="single-clap-comment clap-comment fa-regular fa-comment"/> */}
                        <OpenModalButton
                            buttonText={<i className="single-clap-comment clap-comment fa-regular fa-comment"/>}
                            className="create-comment-btn"
                            modalProps={{hAlign: "right", className: "modal-create-comment"}}
                            modalComponent={<CreateComment postId={post.id}/>}
                            /> 
                        {user && post.owner_id === user && <OpenModalButton
                                buttonText="Edit"
                                className="publish-btn"
                                modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                                modalComponent={<UpdatePost id={post.id} />}
                            />}
                        {user && post.owner_id === user && <OpenModalButton
                                buttonText="Delete"
                                className="delete-general-btn"
                                modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                                modalComponent={<DeletePost id={post.id}><Redirect to="/" /></DeletePost>}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleUserPost;