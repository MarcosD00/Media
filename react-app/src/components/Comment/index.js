import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { loadComment } from '../../../store/comments';
import { loadPost } from '../../../store/posts';
// import OpenModalButton from "../../OpenModalButton";
import './comment.css';

function AllComments() {
    const dispatch = useDispatch();
    const history = useHistory();


    //if not logged in, redirect to home
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    let postId = useParams().postId;

    console.log(postId)
    const comment = useSelector(state => state.comments ? state.comments.tempState : null);
    const post = useSelector(state => state.posts ? state.posts[postId] : null)



    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    useEffect(() => {
        dispatch(loadComment(postId));
    }, [dispatch, postId]);

    useEffect(() => {
        dispatch(loadPost())
    }, [dispatch]);

    if (!comment) return null;
    if (!post) return null;

    // let newArr = Object.values(comment);

    return (
        <>
            <div>{comment}</div>
            <div>{post}</div>
        </>
    )

}

export default AllComments;