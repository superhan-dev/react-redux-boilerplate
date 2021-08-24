import {userConstants} from "../_constants";

export function user(state = {}, action) {

    switch (action.type) {
        case userConstants.GET_LIST_REQUEST:
            return {};
        case userConstants.GET_LIST_SUCCESS:
            return {};
        case userConstants.GET_LIST_FAILURE:
            return {};
        case userConstants.GET_ONE_REQUEST:
            return {};
        case userConstants.GET_ONE_SUCCESS:
            return {};
        case userConstants.GET_ONE_FAILURE:
            return {};
        case userConstants.CREATE_ONE_REQUEST:
            return {};
        case userConstants.CREATE_ONE_SUCCESS:
            return {};
        case userConstants.CREATE_ONE_FAILURE:
            return {};
        case userConstants.UPDATE_ONE_REQUEST:
            return {};
        case userConstants.UPDATE_ONE_SUCCESS:
            return {};
        case userConstants.UPDATE_ONE_FAILURE:
            return {};
        case userConstants.DELETE_ONE_REQUEST:
            return {};
        case userConstants.DELETE_ONE_SUCCESS:
            return {};
        case userConstants.DELETE_ONE_FAILURE:
            return {};
        default:
            return state;
    }
}

