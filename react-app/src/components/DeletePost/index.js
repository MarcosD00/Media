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
        <>
            <div className="deleteDiv">

                <h3 className="deleteText">Confirm You Want To Delete</h3>
                <p className="deleteText">This post will be deleted</p>
                <div>
                    <button onClick={submitDelete}>Confirm</button>
                    <button onClick={submitNo} type="submit">Cancel</button>
                </div>
            </div>
        </>
    )
}
