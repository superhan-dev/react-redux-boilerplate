import BaseApi from "./base.api";

export const UserApi = {
    authenticate,
    logout,
    getMyProfile,
    updateMyProfile,
    updatePassword
}

function authenticate(username, password) {
    return BaseApi.post('/authenticate', {username: username, password: password});
}

function logout() {
    return BaseApi.get('/logout');
}

function getMyProfile() {
    return BaseApi.get('/user/myprofile');
}

function updateMyProfile(formData) {
    return BaseApi.post('/user/web/myprofile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

function updatePassword(currentPassword, updatedPassword) {
    return BaseApi.post('/user/password', {
        currentPassword: currentPassword,
        updatedPassword: updatedPassword
    });
}


