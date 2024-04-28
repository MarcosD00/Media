const LOAD_COMMENTS = "comments/LOAD_COMMENTS"
const LOAD_COMMENTS_BY_POST = "comments/LOAD_COMMENTS_BY_POST"
const LOAD_COMMENTS_BY_USER = "comments/LOAD_COMMENTS_BY_USER"
const ADD_COMMENT = "comments/ADD_COMMENT"
const UPDATE_COMMENTS = "comments/UPDATE_COMMENTS"
const DELETE_COMMENTS = "comments/DELETE_COMMENTS"

const loadComment = comments => ({
    type: LOAD_COMMENTS,
    comments
})

const loadCommentByPost = comments => ({
    type: LOAD_COMMENTS_BY_POST,
    comments
})

const loadCommentByUser = comments => ({
    type: LOAD_COMMENTS_BY_USER,
    comments
})

const addComment = comments => ({
    type: ADD_COMMENT,
    comments
})

const updateComment = comments => ({
    type: UPDATE_COMMENTS,
    comments
})

const deleteComment = comments => ({
    type: DELETE_COMMENTS,
    comments
})

export const fetchLoadComments = () => async dispatch => {
    const response = await fetch(`/api/comment/`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComment(comments));
    }
}

export const fetchLoadCommentByPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comment/post/${postId}`);
    
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadCommentByPost(comments));
    }
}

export const fetchLoadCommentByUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/comment/user/${userId}`);
    const comments = await response.json();

    if (response.ok) {
        dispatch(loadCommentByUser(comments))
        return comments
    }
}

export const fetchAddComment = (newCommentForm, postId) => async (dispatch) => {
    const response = await fetch(`/api/comment/new/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentForm),
    });
    if (response.ok) {
        const comments = await response.json();
        dispatch(addComment(comments))
        return comments
    }
}

export const fetchUpdateComment = (updatedCommentForm, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comment/update-comments/${commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCommentForm),
    });
    if (res.ok) {
        const comments = await res.json();
        // console.log(comments)
        dispatch(updateComment(comments));
        return comments;
    }
}

export const fetchDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment/delete-comments/${commentId}`, {
        method: "POST"
    })
    if (response.ok) {
        dispatch(deleteComment(commentId))
    }

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            const allComments = action.comments || []
            // action.comments.forEach(ele => allComments[ele.id] = ele);
            return { ...state, allComments }

        case LOAD_COMMENTS_BY_POST:
            const tempState = action.comments || []
            // action.comments.forEach(ele => tempState[ele.id] = ele);
            return { ...state, tempState }


        case LOAD_COMMENTS_BY_USER:
            const newState = action.comments || []
            action.comments.forEach(ele => newState[ele.id] = ele);
            return { ...state, newState }

        case ADD_COMMENT:
            return { ...state, [action.comments.id]: action.comments }


        case UPDATE_COMMENTS:
            return { ...state, [action.comments.id]: action.comments };

        case DELETE_COMMENTS:
            const stateN = { ...state.newState }
            delete stateN[action.comments]
            return { ...state }


        default: return state;
    }
}