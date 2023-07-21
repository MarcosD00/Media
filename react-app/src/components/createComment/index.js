import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {useModal} from "../../context/Modal"
import AllComments from "../Comment"
import { fetchAddComment } from '../../store/comments';
import "./createComment.css";

function CreateComment() {
    const { closeModal } = useModal();
    const history = useHistory();
    let post_id = useParams().postId;


    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    const user_id = useSelector(state => state.session.user.id);

    const [comment, setComment] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const errors = {};

    useEffect(() => {
        if (comment.length === 0) errors.comment = 'Comment is required';
        if (comment.length < 25) errors.comment = 'Comment must be at least 25 characters';

        setValidationErrors(errors);
    }, [comment])

    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        closeModal()

        let newComment = {}
        if (!Object.values(errors).length) {
            newComment = {
                "comment": comment,
                "user_id": user_id,
                "post_id": post_id
            }
        }

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        let createdComment = await dispatch(fetchAddComment(newComment, post_id))

        if (createdComment) {
            history.push(`/`);
        }
    }

    const submitNo=()=>{
        closeModal()
    }

    return (
        <div >
            {/* <div className='modal-content'> */}
                <form className="form" onSubmit={onSubmit}>

                    <p className='error'> {hasSubmitted && validationErrors.comment && `${validationErrors.comment}`}</p>
                    <textarea className='comment-submit-text' placeholder='What are your thoughts?' type="text" value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <div className='comment-btn-container'>
                        <button className="submit-comment-btn" type="submit">Respond</button>
                        <p className="comment-cancel-btn" onClick={submitNo}>Cancel</p>
                    </div>

                </form >

            {/* </div> */}
                <AllComments />
        </div>
    )
}

export default CreateComment
