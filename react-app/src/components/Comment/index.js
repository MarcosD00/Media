import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostDate from '../PostDate';
import { useHistory } from "react-router-dom";
import { fetchLoadCommentByPost } from '../../store/comments';
import { allPosts } from '../../store/posts';
import DeleteComment from '../DeleteComment';
import UpdateComment from '../UpdateComment';
import OpenModalButton from "../OpenModalButton";
import './comment.css';

function AllComments({ postId, newComment }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    const comment = useSelector(state => state.comments ? state.comments.tempState : null);
    
    if (sessionUser) {
        userId = sessionUser.id
    }

    useEffect(() => {
        dispatch(fetchLoadCommentByPost(postId))
    }, [dispatch, postId, newComment]);
    useEffect(() => {
        dispatch(allPosts())
    }, [dispatch]);

    return (
        <div className='main-comment-page'>
            {comment?.map(ele =>
            <div key={ele.id}>
                <div className='comment-container'>
                    <div className="post-user-container">
                        <img className="post-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                        <p className='name-display'>{ele.User_firstName} {ele.User_lastName} · <PostDate date={ele.created_at} /></p>
                    </div> 
                        <p className='comment-display'>{ele.comment}</p>
                    <div className='comment-btn-container'>
                      
                        {sessionUser.id === ele.User_id ?
                        <div>
                            <OpenModalButton buttonText="update" 
                            className="publish-btn"
                            modalComponent={<UpdateComment id={ele.id} postId={postId}/>} 
                            modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                            /> 
                        </div> :
                            null
                        }
                        {sessionUser.id === ele.User_id ?
                        <div>
                            <OpenModalButton buttonText="Delete" 
                            className="delete-general-btn"
                            modalComponent={<DeleteComment comment={ele.id} postId={postId}/>} 
                            modalProps={{hAlign: "center", className: "modal-create-comment", id: "modal-background"}}
                            />
                            
                        </div> :
                            null
                        }
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default AllComments;


