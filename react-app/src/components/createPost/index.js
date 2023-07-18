import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./createPost.css";

import { addPost } from "../../store/posts";
  //some comment to push to git
function CreatePost() {
    const dispatch = useDispatch();

    const [photo, setPhoto] = useState("")
    const [title, setTitle] = useState("")
    const [story, setStory] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    const user_id = useSelector(state => state.session.user.id);

    const err = {}
    
    if (story.length < 3000) err['story'] = "your story is too short";

    let newPost = {}
    if (!Object.values(err).length) {
        newPost = {
            "owner_id": user_id,
            "photo": photo,
            "title": title,
            "story": story,
        }
    }

    const history = useHistory();
    const updatePhoto = (e) => setPhoto(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateStory = (e) => setStory(e.target.value);
    function onSubmit(e) {
        const errors = {};
        if (story.length < 5) errors['story'] = "your story is too short";


        setValidationErrors(errors);
        e.preventDefault();

        if (!Object.values(errors).length) {
            setRun('yes')
        } else {
            setRun('no')
        }
    }

    const submitNo = () => {
        history.push('/')
    }

    useEffect(() => {
        if (Object.values(newPost).length && run === 'yes') {
            const refun = async () => {
                const res = await dispatch(addPost(newPost))
                history.push('/')
            }
            refun();
        }
    }, [run])

    return (
        <div className="main-create-page">
        {validationErrors.post && <p className="errorsQuestion">{validationErrors.post}</p>}

            <form onSubmit={onSubmit} className="createForm">
                    <div className="form-submit-btns">
                        <button type="submit" className="publish-btn">Publish</button>
                        <button onClick={submitNo} type="delNo">Cancel</button>
                    </div>
                    <div className="form-text-areas">
                        <textarea 
                            value={photo} 
                            onChange={updatePhoto} 
                            placeholder="Submit a photo here" 
                            className="simple-style photo-text-submit" 
                        />
                        <textarea
                            type="text"
                            value={title}
                            onChange={updateTitle}
                            placeholder="Title"   
                            className="simple-style title-text-submit"                 
                            />
                        <textarea 
                            value={story} 
                            onChange={updateStory} 
                            placeholder="Tell your story..." 
                            className="simple-style story-text-submit" 
                        />
                    </div>

            </form>
        </div>
    )
}

export default CreatePost;