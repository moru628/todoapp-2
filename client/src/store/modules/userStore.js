import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userStore = createSlice({
    name: 'user',
    initialState: {
        userName: 'Guest',
        profileImg: '/assets/profile-black.png',
    },
    reducers: {
        setUser(state, action) {
            state.userName = action.payload.name;
            state.profileImg = action.payload.profileImg 
            ? `${url}/upload/${action.payload.profileImg}` 
            : '/assets/profile-blank.png';
        },
        clearUser(state) {
            state.userName = 'Guest';
            state.profileImg = '/assets/profile-black.png';
        },
    },
});

const url = process.env.REACT_APP_BACKEND_URL;
const { setUser, clearUser } = userStore.actions;

const fetchUserData = () => {
    return async (dispatch) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            dispatch(clearUser());
            return;
        }
        try {
            const response = await axios.get(`${url}/user/${userId}`);
            dispatch(setUser(response.data));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
};

const selectUserName = (state) => state.user.userName;
const selectProfileImg = (state) => state.user.profileImg;

export { fetchUserData, selectUserName, selectProfileImg };

export default userStore.reducer;
