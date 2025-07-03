import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../Features/authSlice'
import postSlice from '../Features/postSlice'
import savedSlice from '../Features/savedSlice'
export const store = configureStore({
    reducer:{
        auth : authSlice,
        posts : postSlice,
        saved : savedSlice,
    }
});

export default store;

