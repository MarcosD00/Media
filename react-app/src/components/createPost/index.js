import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./createPost.css";
import { addPost } from "../../store/posts";

function CreatePost() {
    const dispatch = useDispatch();

    const [photo, setPhoto] = useState("")
    const [title, setTitle] = useState("")
    const [story, setStory] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    const userId = useSelector(state => state.session.user.id);

    const errors = {}
    
    useEffect(() => {
        if (title.length === 0) errors.title = '*title* is required';
        if (title.length < 50) errors.title = '*title* must be at least 50 characters';
        if (story.length === 0) errors.story = '*story* is required';
        if (story.length < 100) errors.story = '*story* must be at least 100 characters';

        setValidationErrors(errors);
    }, [story, title])
    let newPost = {}

    const history = useHistory();
    const updateTitle = (e) => setTitle(e.target.value);
    const updateStory = (e) => setStory(e.target.value);
    async function onSubmit (e) {

        setValidationErrors(errors);
        e.preventDefault();

        const formData = new FormData()

        formData.append("owner_id", userId)
        formData.append("photo", photo)
        formData.append("title", title)
        formData.append("story", story)

        const refun = await dispatch(addPost(formData))
        
        if(refun){
            setPhoto(null)
            setTitle("")
            setStory("")

            history.push('/')
        }
    }
    
    const submitNo = () => {
        history.push('/')
    }
    
    useEffect(() => {
        if (Object.values(newPost).length && run === 'yes') {
            const refun = async () => {
                await dispatch(addPost(newPost))
                .then(history.push('/'))
            }
            refun();
        }
    }, [run])
    
    if (!userId) return history.push('/');
    return (
        <div className="main-create-page">

            <form onSubmit={onSubmit} className="createForm">
                {validationErrors.title && <p className="title-error">{validationErrors.title}</p>}
                {validationErrors.story && <p className="story-error">{validationErrors.story}</p>}
                <div className="form-submit-btns">
                    <button disabled={title.length < 50 || story.length < 100 } type="submit" className="publish-btn">Publish</button>
                    <button onClick={submitNo} className="cancel-btn" type="delNo">Cancel</button>
                </div>
                <div className="form-text-areas">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
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