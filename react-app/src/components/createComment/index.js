import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useModal} from "../../context/Modal"
import AllComments from "../Comment"
import { fetchAddComment } from '../../store/comments';
import "./createComment.css";

function CreateComment({ postId }) {
    const { closeModal } = useModal();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/post/${postId}`);

    const user_id = useSelector(state => state.session.user.id);

    const [createdComment, setCreatedComment] = useState('')
    const [comment, setComment] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const errors = {};

    useEffect(() => {
        if (comment.length === 0) errors.comment = 'Comment is required';
        if (comment.length < 5) errors.comment = '*Comment* must be at least 5 characters';

        setValidationErrors(errors);
    }, [comment])

    const dispatch = useDispatch()

    
    const onSubmit = async (e) => {
        e.preventDefault();
        

        let newComment = {}
        if (!Object.values(errors).length) {
            newComment = {
                "comment": comment,
                "user_id": user_id,
                "post_id": postId
            }
        }
        
        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        setCreatedComment(await dispatch(fetchAddComment(newComment, postId)))

        setComment('')
    }

    const submitNo=()=>{
        closeModal()
    }
    return (
        <>
                {validationErrors.comment && <p className="title-error">{validationErrors.comment}</p>}
            <div className='create-comment-container'>
                <form className="form" onSubmit={onSubmit}>

                    <textarea className='comment-submit-text' placeholder='What are your thoughts?' type="text" value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <div className='comment-btn-container'>
                        <button className="submit-comment-btn" disable={comment.length < 5} type="submit">Respond</button>
                        <p className="comment-cancel-btn" onClick={submitNo}>Cancel</p>
                    </div>

                </form >
            </div>

            <AllComments postId={postId} newComment={createdComment} />
        </>
    )
}

export default CreateComment
