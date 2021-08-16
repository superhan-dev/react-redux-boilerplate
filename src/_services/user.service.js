// import config from 'config';
import { UserApi, handleResponse} from '../_apis'

export const userService = {
    login,
    logout,
    getMyProfile,
    updateMyProfile,
    getMyDashboard,
    updatePassword
};


function login(username, password){
    return UserApi
        .authenticate(username, password)
        .then(handleResponse)
        .then( user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout(){
    localStorage.removeItem('user');
}


function getMyProfile(){
    return UserApi
        .getMyProfile()
        .then(handleResponse)
        .then( profile => {
            let user = JSON.parse(localStorage.getItem('user'));
            user.userProfile = profile;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}


function updateMyProfile(formData){
    return UserApi
        .updateMyProfile(formData)
        .then(handleResponse)
        .then( profile => {
            let user = JSON.parse(localStorage.getItem('user'));
            user.userProfile = profile;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function getMyDashboard(){
    return UserApi
        .getMyDashboard()
        .then(handleResponse)
        .then( dashboard => {   
            return dashboard;
        });
}

function updatePassword(currentPassword, updatedPassword){
    return UserApi
        .updatePassword(currentPassword, updatedPassword)
        .then(handleResponse)
        .then( content => {
            // 암호 변경 결과가 성공이면 Empty Object가 반환되므로,
            // 다른 처리를 할 것은 없다.
            return content;
        });
}
