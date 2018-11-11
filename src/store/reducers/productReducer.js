import {FETCH_PRODUCTS} from '../actions/types';


const initialState = {
    items: [],
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                items: payload
            };
        default:
            return state;
    }
}