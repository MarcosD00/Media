import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdate } from "../../store/posts";
import { useHistory, Redirect } from "react-router-dom";
import "./updatePost.css"
import { useModal } from "../../context/Modal";

function UpdatePost({ id }) {
    const { closeModal } = useModal();

    const post = useSelector(state => state.posts.allPosts[id])
    const user_id = useSelector(state => state.session.user.id);
    
    const [photo, setPhoto] = useState(post.photo)
    const [title, setTitle] = useState(post.title)
    const [story, setStory] = useState(post.story);
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    const err = {}
    const errors = {}
    
    useEffect(() => {
        if (title.length === 0) errors.title = '*title* is required';
        if (title.length < 50) errors.title = '*title* must be at least 50 characters';
        if (story.length === 0) errors.story = '*story* is required';
        if (story.length < 100) errors.story = '*story* must be at least 100 characters';

        setValidationErrors(errors);
    }, [story, title])

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
            setRun("yes")
        } else {
            setRun("no")
        }
    }

    const submitNo = () => {
        history.push('/')
    }

    useEffect(() => {
        if (Object.values(newPost).length && run === "yes") {
            const refun = async () => {
                closeModal()
                history.push(`/`)
            }
            refun();
        }
    }, [run])

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/landing" />;

    return (
        <div className="main-create-pagepdateDiv update-modal">
            <h2 className="updateText">Update your post</h2>
            {validationErrors.title && <p className="title-error">{validationErrors.title}</p>}
            {validationErrors.story && <p className="story-error">{validationErrors.story}</p>}

            <form onSubmit={onSubmit} className="createForm">
                <div className="form-submit-btns">
                    <button disabled={title.length < 50 || story.length < 100} className="publish-btn">Update Post</button>
                    <button onClick={submitNo} className="cancel-btn" type="delNo">Cancel</button>
                </div>
                <div className="form-text-areas">
                    <textarea 
                        value={photo} 
                        onChange={updatePhoto} 
                        placeholder="Update your photo here"
                        className="simple-style photo-text-submit" >
                    </textarea>
                    <textarea 
                        value={title} 
                        onChange={updateTitle} 
                        placeholder="Update your title here"
                        className="simple-style title-text-submit" >
                    </textarea>
                    <textarea 
                        value={story} 
                        onChange={updateStory} 
                        placeholder="Update your story here"
                        className="simple-style story-text-submit update-text" >
                    </textarea>
                </div>
            </form>
        </div>
    )
}

export default UpdatePost;