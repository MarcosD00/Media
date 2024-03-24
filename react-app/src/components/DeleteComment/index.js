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

    const userId = useSelector(state => state.session.user.id)

    
    const commentId = comment;

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(fetchDeleteComment(commentId))
            .then(dispatch(fetchLoadCommentByUser(userId)))
            .then(dispatch(fetchLoadCommentByUser(userId)))
            .then(closeModal())
    }

    const handleCancel = (e) => {
        closeModal()
    }

    return (
        <div className="delete-container">
            <h3 className="delete-text">Confirm You Want To Delete</h3>
            <p className="delete-text">*This comment will be deleted*</p>
            <div>
                <button className="delete-general-btn" type="submit" onClick={handleSubmit}>Confirm</button>
                <button className="cancel-general-btn" type="submit" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )

}

export default DeleteComment;