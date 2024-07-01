import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice';
const ReduxStore = configureStore({
    reducer : {
        App:ReduxSliceReducer
    }
});
export default ReduxStore