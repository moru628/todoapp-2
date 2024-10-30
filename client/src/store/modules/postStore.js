import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postStore = createSlice({
    name:'post',
    initialState:{
        posts:[],
        selectedPosts:[]
    },
    reducers:{
        setPosts(state, action){
            state.posts = action.payload
        },
        setSelectedPosts(state,action){
            state.selectedPosts = action.payload
        },
        addPost(state, action) {
            state.posts.unshift(action.payload);
          },
    }
})

const url = process.env.REACT_APP_BACKEND_URL;
const {setPosts, setSelectedPosts, addPost } = postStore.actions

const fetchPostsData = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`${url}/post`)
            const updatePosts = response.data.map(post => ({
                ...post,
                profileImg: post.profileImg ? `${url}/upload/${post.profileImg}` : '/assets/profile-blank.png'
            }))
            dispatch(setPosts(updatePosts))
        }catch(error){
            console.error('Error fetching posts', error)
        }
    }
}
const selectThreeRandomPosts = () => {
    return async(dispatch) => {
        const response = await axios.get(`${url}/post`)
        const posts = response.data
        const selectedPosts = posts
            .sort(() => 0.5 - Math.random())
            .slice(0,3)
        dispatch(setSelectedPosts(selectedPosts))
    }
}

const addNewPost = (newPost) => async (dispatch) => {
    try {
      const response = await axios.post(`${url}/post`, newPost);
      const savedPost = response.data;
      dispatch(addPost({
        ...savedPost,
        profileImg: savedPost.profileImg ? `${url}/upload/${savedPost.profileImg}` : '/assets/profile-blank.png'
      }));
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

export {fetchPostsData,selectThreeRandomPosts,addNewPost}
export default postStore.reducer