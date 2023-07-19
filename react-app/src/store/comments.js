const LOAD_COMMENTS = "comments/LOAD_COMMENTS"
const LOAD_COMMENTS_BY_POST = "comments/LOAD_COMMENTS_BY_POST"
const LOAD_COMMENTS_BY_USER = "comments/LOAD_COMMENTS_BY_USER"
const ADD_COMMENT = "comments/ADD_COMMENT"
const UPDATE_COMMENTS = "comments/UPDATE_COMMENTS"
const DELETE_COMMENTS = "comments/DELETE_COMMENTS"

const loadComment = payload => ({
    type: LOAD_COMMENTS,
    payload
})

const loadCommentByPost = payload => ({
    type: LOAD_COMMENTS_BY_POST,
    payload
})

const loadCommentByUser = payload => ({
    type: LOAD_COMMENTS_BY_USER,
    payload
})

const addComment = payload => ({
    type: ADD_COMMENT,
    payload
})

const updateComment = payload => ({
    type: UPDATE_COMMENTS,
    payload
})

const deleteComment = payload => ({
    type: DELETE_COMMENTS,
    payload
})

export const fetchLoadComments = () => async dispatch => {
    const response = await fetch(`/api/comment/`);
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadComment(payload));
    }
}

export const fetchLoadCommentByPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comment/post/${postId}`);

    if (response.ok) {
        const payload = await response.json();
        dispatch(loadCommentByPost(payload));
    }
}

export const fetchLoadCommentByUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/comment/user/${userId}`);

    if (response.ok) {
        const payload = await response.json();
        dispatch(loadCommentByUser(payload))
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
        const payload = await response.json();
        dispatch(addComment(payload))
        return payload
    }
}

export const fetchUpdateComment = (updatedCommentForm, commentId) => async (dispatch) => {
    const res = await fetch(`/api/coment/update-comments/${commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCommentForm),
    });
    if (res.ok) {
        const payload = await res.json();
        dispatch(updateComment(payload));
        return payload;
    }
}

export const fetchDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment/delete-comments/${commentId}`, {
        method: "POST"
    })
    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}

// const LOAD_COMMENTS = "comments/LOAD_COMMENTS"
// const LOAD_COMMENTS_BY_POST = "comments/LOAD_COMMENTS_BY_POST"
// const LOAD_COMMENTS_BY_USER = "comments/LOAD_COMMENTS_BY_USER"
// const ADD_COMMENT = "comments/ADD_COMMENT"
// const UPDATE_COMMENTS = "comments/UPDATE_COMMENTS"
// const DELETE_COMMENTS = "comments/DELETE_COMMENTS"

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            const allComments = {}
            action.payload.forEach(ele => allComments[ele.id] = ele);
            return { ...state, allComments }

        case LOAD_COMMENTS_BY_POST:
            const tempState = {}
            action.payload.forEach(ele => tempState[ele.id] = ele);
            return { ...state, tempState }


        case LOAD_COMMENTS_BY_USER:
            const newState = {}
            action.payload.forEach(ele => newState[ele.id] = ele);
            return { ...state, newState }

        case ADD_COMMENT:
            return { ...state, [action.payload.id]: action.payload }


        case UPDATE_COMMENTS:
            return { ...state, [action.payload.id]: action.payload };

        case DELETE_COMMENTS:
            const stateN = { ...state.newState }
            delete stateN[action.payload]
            return { ...state }


        default: return state;
    }
}