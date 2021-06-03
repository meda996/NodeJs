//import * as actionTypes from './actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as actionTypes from './action';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const initialState = {
    startTime: Date.now(),
    sessionStartTime: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SESSION_START:
            return{
                ...state,
                sessionStartTime: Date.now(),
            }
        default: return state
    }
    
}

export default persistReducer(persistConfig, reducer);