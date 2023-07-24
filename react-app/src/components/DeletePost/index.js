import { useDispatch } from "react-redux"
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import "./delete.css"

export default function DeletePost({id}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    const submitDelete = ()=>{
        dispatch(deletePost(id));
        closeModal()
        history.push('/')
    };



    const submitNo=()=>{
        closeModal()
    }
    
    return(
            <div className="delete-container">

                <h3 className="delete-text">Confirm You Want To Delete</h3>
                <p className="delete-text">*This post will be deleted*</p>
                <div>
                    <button className="delete-general-btn" onClick={submitDelete}>Confirm</button>
                    <button className="cancel-general-btn" onClick={submitNo} type="submit">Cancel</button>
                </div>
            </div>
    )
}
