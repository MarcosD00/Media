import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdate } from "../../store/posts";
import { useHistory, Redirect } from "react-router-dom";
import "./updatePost.css"
import { useModal } from "../../context/Modal";

function UpdatePost({ id }) {
    const { closeModal } = useModal();
    
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts.allPosts[id])
    console.log(useSelector(state => state.posts.allPosts))
    const user_id = useSelector(state => state.session.user.id);
    
    const [photo, setPhoto] = useState(post.photo)
    const [title, setTitle] = useState(post.title)
    const [story, setStory] = useState(post.story);
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    const err = {}
    if (title.length < 50) err['title'] = "your title is too short";
    if (story.length < 100) err['story'] = "your story is too short";

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

    useEffect(() => {
        if (Object.values(newPost).length && run === "yes") {
            const refun = async () => {
                const res = await dispatch(postUpdate(id, newPost))
                closeModal()
                history.push(`/`)
            }
            refun();
        }
    }, [run])

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/landing" />;

    return (
        <div className="updateDiv">
            <h1 className="updateText">Update your story</h1>
            {validationErrors.post && <p>{validationErrors.post}</p>}

            <form onSubmit={onSubmit} className="updateForm">
                <textarea value={photo} onChange={updatePhoto} placeholder="Update your photo here"></textarea>
                <textarea value={title} onChange={updateTitle} placeholder="Update your title here"></textarea>
                <textarea value={story} onChange={updateStory} placeholder="Update your story here"></textarea>
                <button className="updateButton">Update Post</button>
            </form>
        </div>
    )

}

export default UpdatePost;