//import * as actionTypes from './actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as actionTypes from './action';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const initialState = {

}

const reducer = (state = initialState, action) => {

    
}

export default persistReducer(persistConfig, reducer);