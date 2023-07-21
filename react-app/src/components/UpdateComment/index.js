// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUpdateComment } from "../../store/comments";
// import { useHistory, Redirect } from "react-router-dom";
// import "./updateComment.css"
// import { useModal } from "../../context/Modal";

// function UpdateComment({ id }) {
//     const { closeModal } = useModal();
    
//     const dispatch = useDispatch();

//     const user_id = useSelector(state => state.session.user.id);

//     const [comment, setComment] = useState("");
//     const [validationErrors, setValidationErrors] = useState({});
//     const [run, setRun] = useState("no")

//     const err = {}
//     if (comment.length < 25) err['comment'] = "your story is too short";

//     let newComment = {}
//     if (!Object.values(err).length) {
//         newComment = {
//             "comment": comment,
//         }
//     }

//     const history = useHistory();
//     const updateComment = (e) => setComment(e.target.value);
//     function onSubmit(e) {
//         const errors = {};
//         if (comment.length < 8) errors['comment'] = "your story is too short";

//         setValidationErrors(errors);
//         e.preventDefault();

//         if (!Object.values(errors).length) {
//             setRun("yes")
//         } else {
//             setRun("no")
//         }

//     }

//     useEffect(() => {
//         if (Object.values(newComment).length && run === "yes") {
//             const refun = async () => {
//                 const res = await dispatch(fetchUpdateComment(id, newComment))
//                 closeModal()
//                 history.push(`/`)
//             }
//             refun();
//         }
//     }, [run])

//     const sessionUser = useSelector((state) => state.session.user);
//     if (!sessionUser) return <Redirect to="/login" />;

//     return (
//         <div className="updateDiv">
//             <h1 className="updateText">Update your comment</h1>
//             {validationErrors.comment && <p>{validationErrors.comment}</p>}

//             <form onSubmit={onSubmit} className="updateForm">
//                 <textarea value={comment} onChange={updateComment} placeholder="Update your comment here"></textarea>
//                 <button className="updateButton">Update comment</button>
//             </form>
//         </div>
//     )

// }

// export default UpdateComment;

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

function UpdateComment({ id }) {
    const { closeModal } = useModal();
    const history = useHistory();
    let post_id = useParams().postId;

    const comments = useSelector(state => state.comments ? state.comments.tempState : null);

    // console.log(comments.map(ele => {
    //     return ele.id
    // }))
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
            }
        }

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        let createdComment = await dispatch(fetchUpdateComment(newComment, id))

        if (createdComment) {
            // history.push(`/post/${post_id}`);
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
                    <textarea className='comment-submit-text' placeholder='What are your thoughts?'value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                        <button className="submit-comment-btn" type="submit">Respond</button>
                        <p className="comment-cancel-btn" onClick={submitNo}>Cancel</p>

                </form >

            {/* </div> */}
        </div>
    )
}

export default UpdateComment