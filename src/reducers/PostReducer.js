import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, "id");
        case FETCH_POST:
            // ES5
            // const post = action.payload.data;
            // const newState =  { ...state };
            // newState[post.id] = post;
            // return newState;

            return { ...state, [action.payload.data.id]: action.payload.data };

        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }

    return state;
};
