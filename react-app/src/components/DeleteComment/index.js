import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./deleteComment.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchDeleteComment, fetchLoadCommentByUser } from "../../store/comments";





function DeleteComment({ comment, postId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    // let postId = useParams().postId;

    const userId = useSelector(state => state.session.user.id)

    
    const commentId = comment;
    console.log(commentId)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(fetchDeleteComment(commentId))
            .then(dispatch(fetchLoadCommentByUser(userId)))
            .then(dispatch(fetchLoadCommentByUser(userId)))
            // .then(history.push(`/post/${postId}`))
            .then(closeModal())
    }

    const handleCancel = (e) => {
        closeModal()
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this comment</p>

            <button type="submit" onClick={handleSubmit}>Yes (Delete Comment)</button>
            <button type="submit" onClick={handleCancel}>No (Keep Commnet)</button>
        </div>
    )

}

export default DeleteComment;