import { configureStore } from "@reduxjs/toolkit";
import activityReducer from './modules/activityStore'
import postReducer from './modules/postStore'
import taskReducer from './modules/taskStore'
import taskFormReducer from './modules/taskFormStore'
import eventReducer from './modules/eventStore'
import userReducer from './modules/userStore'
const store = configureStore({
    reducer:{
        activity: activityReducer,
        post: postReducer,
        task: taskReducer,
        taskForm: taskFormReducer,
        event: eventReducer,
        user: userReducer
    }
})

export default store