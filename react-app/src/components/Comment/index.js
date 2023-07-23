import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { fetchLoadCommentByPost } from '../../store/comments';
import { allPosts } from '../../store/posts';
import {useModal} from "../../context/Modal"
import DeleteComment from '../DeleteComment';
import UpdateComment from '../UpdateComment';
import OpenModalButton from "../OpenModalButton";
import './comment.css';

function AllComments({ postId, newComment }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    //if not logged in, redirect to home
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    const comment = useSelector(state => state.comments ? state.comments.tempState : null);
    const post = useSelector(state => state.posts ? state.posts[postId] : null)
    
    let userId;

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
                        <p className='name-display'>{ele.User_firstName} {ele.User_lastName} · {ele.created_at}</p>
                        <p className='comment-display'>{ele.comment}</p>
                </div>
                {sessionUser.id === ele.User_id ?
                <div>
                    <OpenModalButton buttonText="Delete" 
                    modalComponent={<DeleteComment comment={ele.id} postId={postId}/>} /> 
                </div> :
                    null
                }
                {sessionUser.id === ele.User_id ?
                <div>
                    <OpenModalButton buttonText="update" 
                    modalComponent={<UpdateComment id={ele.id} postId={postId}/>} /> 
                </div> :
                    null
                }
            </div>
            )}
        </div>
    )

}

export default AllComments;


