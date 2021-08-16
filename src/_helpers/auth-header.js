export function authHeader(){
  let user = JSON.parse(localStorage.getItem('user'));

  if(user && user.jwtToken){
      return 'Bearer ' + user.jwtToken;
  }else{
      return null;
  }
}