import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {useModal} from "../../context/Modal"
import { fetchUpdateComment } from "../../store/comments";
import AllComments from "../Comment"
import { fetchAddComment } from '../../store/comments';
import "./updateComment.css"

function UpdateComment({ id, postId }) {
    const { closeModal } = useModal();
    const history = useHistory();
    let post_id = useParams().postId;

    const comments = useSelector(state =>state.comments.tempState[id]);

    // console.log(comments.map(ele => {
    //     return ele.id
    // }))
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    const user_id = useSelector(state => state.session.user.id);

    const [comment, setComment] = useState(comments.comment);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const errors = {};

    useEffect(() => {
        if (comment.length === 0) errors.comment = 'Comment is required';
        if (comment.length < 5) errors.comment = 'Comment must be at least 5 characters';

        setValidationErrors(errors);
    }, [comment])

    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();

        let newComment = {}
        if (!Object.values(errors).length) {
            newComment = {
                "comment": comment,
            }
        }

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        let createdComment = await dispatch(fetchUpdateComment(newComment, id))

        if (createdComment) {
            closeModal()
            history.push(`/post/${postId}`);
        }
    }

    const submitNo=()=>{
        closeModal()
    }

    return (
        <div >
                <form className="form" onSubmit={onSubmit}>

                {validationErrors.comment && <p className="title-error">{validationErrors.comment}</p>}
                    <textarea className='comment-submit-text' placeholder='What are your thoughts?'value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                        <button disable={comment.length < 5} className="submit-comment-btn" type="submit">Respond</button>
                        <p className="comment-cancel-btn" onClick={submitNo}>Cancel</p>

                </form >
        </div>
    )
}

export default UpdateComment