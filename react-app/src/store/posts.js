const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_SINGLE_POST = "post/LOAD_SINGLE_POST"
const ADD_POST = "posts/ADD_QUESTION";
const UPDATE_POST = "posts/UPDATE_POST";
const REMOVE_POST = "posts/REMOVE_POST";

const loadPost = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const loadSinglePost = (post) =>{
    return {
        type: LOAD_SINGLE_POST,
        post
    }
}

const addNewPost = (post) => ({
    type: ADD_POST,
    post
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
});

export const allPosts = () => async dispatch => {
    const res = await fetch("/api/post/");
    const posts = await res.json();

    dispatch(loadPost(posts));
};

export const singlePost = (postId) => async dispatch => {
    const res = await fetch(`/api/post/${postId}`)
    const post = await res.json()
    if (res.ok) {
        dispatch(loadSinglePost(post))
        return post
    }
}

export const addPost = (post) => async dispatch => {
    const res = await fetch("/api/post/new-post", {
        method: "POST",
        body: post
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addNewPost(data));
        return data;

    }
};

export const deletePost = (id) => async dispatch => {
    const res = await fetch(`/api/post/delete-post/${id}`, {
        method: "POST"
    });
    if (res.ok) {
        
        dispatch(removePost(id));
    }
}

export const postUpdate = (id, post) => async dispatch => {
    const res = await fetch(`/api/post/update-post/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    });

    if (res.ok) {

        const updatePos = await res.json()

        dispatch(updatePost(updatePos))
        return res
    }
}


// const ADD_POST = "posts/ADD_QUESTION";
// const UPDATE_POST = "posts/UPDATE_POST";
// const REMOVE_POST = "posts/REMOVE_POST";
const initialState = {
    allPosts: {},
    singlePost: {},
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_POSTS:
        const newPostsState = {};
        action.posts.forEach((ele) => (newPostsState[ele.id] = ele));
        return { ...state, allPosts: { ...newPostsState } };
  
      case LOAD_SINGLE_POST:
        const newState = { ...state };
        newState.singlePost = { ...action.post }
        return newState
  
      case ADD_POST:
        return {
          ...state,
          allPosts: {
            ...state.allPosts,
            [action.post.id]: action.post,
          },
        };
  
      case UPDATE_POST:
        return {
          ...state,
          allPosts: {
            ...state.allPosts,
            [action.post.id]: action.post,
          },
        };
  
      case REMOVE_POST:
        const updatedPosts = { ...state.allPosts };
        delete updatedPosts[action.postId];
        return {
          ...state,
          allPosts: updatedPosts,
        };
  
      default:
        return state;
    }
  };
  

export default postReducer