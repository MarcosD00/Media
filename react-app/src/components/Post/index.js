import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allPosts } from "../../store/posts";
import DeletePost from "../DeletePost"
import PostDate from "../PostDate";
import OpenModalButton from "../OpenModalButton";
import UpdatePost from "../UpdatePost"
import "./post.css"

const PostComponent = () => {
    const posts = useSelector(state => Object.values(state.posts.allPosts))
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allPosts())
        
    }, [dispatch, posts.length]);

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
                                    <p className="post-user-name name-display">{ele.User_firstName} {ele.User_lastName} · <PostDate date={ele.created_at} /></p>
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
                        {user && ele.owner_id === user.id && <OpenModalButton
                            buttonText="Edit"
                            className="publish-btn"
                            modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                            modalComponent={<UpdatePost id={ele.id} 
                                />}
                            />}                
                        {user && ele.owner_id === user.id && <OpenModalButton
                            buttonText="Delete"
                            className="all-delete-btn delete-general-btn"
                            modalComponent={<DeletePost id={ele.id} 
                            modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                                />}
                            />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default PostComponent;