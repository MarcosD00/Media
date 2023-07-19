import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { fetchLoadComments } from '../../store/comments';
import { allPosts } from '../../store/posts';
import OpenModalButton from "../OpenModalButton";
import './comment.css';

function AllComments() {
    const dispatch = useDispatch();
    const history = useHistory();


    //if not logged in, redirect to home
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    let postId = useParams().postId;

    const comment = useSelector(state => state.comments);
    const post = useSelector(state => state.posts ? state.posts[postId] : null)
    console.log(comment)



    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    useEffect(() => {
        dispatch(fetchLoadComments(postId));
    }, [dispatch, postId]);

    useEffect(() => {
        dispatch(allPosts())
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