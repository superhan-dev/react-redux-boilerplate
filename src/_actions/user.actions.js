import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const userActions = {
    login,
    logout,
    getMyProfile,
    updateMyProfile,
    updatePassword
};

function login(username, password, from) {
    return dispatch => {
        dispatch(reqeust({username}));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function reqeust(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function getMyProfile() {
    console.log("getMyProfile");
    return dispatch => {
        dispatch(request());

        userService.getMyProfile()
            .then(
                user => {
                    console.log("getMyProfile succ", user);
                    return dispatch(success(user))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() {
        return {type: userConstants.GETPROFILE_REQUEST}
    }

    function success(user) {
        return {type: userConstants.GETPROFILE_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.GETPROFILE_FAILURE, error}
    }
}

function updateMyProfile(formData) {
    console.log(formData);
    return dispatch => {
        dispatch(request(formData));

        userService.updateProfile(formData)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(updSomeProf) {
        return {type: userConstants.UPDPROFILE_REQUEST}
    }

    function success(user) {
        return {type: userConstants.UPDPROFILE_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.UPDPROFILE_FAILURE, error}
    }
}


function updatePassword(currentPassword, updatedPassword) {
    console.log(currentPassword, updatedPassword);
    return dispatch => {
        dispatch(request(currentPassword, updatedPassword));

        userService.updateProfile(currentPassword, updatedPassword)
            .then(
                profile => dispatch(success()),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(updSomeProf) {
        return {type: userConstants.UPDPASSWORD_REQUEST}
    }

    function success() {
        return {type: userConstants.UPDPASSWORD_SUCCESS}
    }

    function failure(error) {
        return {type: userConstants.UPDPASSWORD_FAILURE, error}
    }
}