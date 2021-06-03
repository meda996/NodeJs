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
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            
        default: return state
    }
    
}

export default persistReducer(persistConfig, reducer);