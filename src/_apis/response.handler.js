import { history } from "../_helpers";

export const handleResponse = (response) => {
    let error = null;
    if(response.status === 200 && response.data.result !== "S"){
        if(response.data){
            error = new Error(response.data.resultDesc);
            // resultCode 에러는 JWT 토큰이 만료된 경우에 던지는 에러 코드이다.
            if(response.data.resultCode === 701){
                error.name = "Unauthorized";
                localStorage.removeItem('user');
                // 이곳이 토큰 만료시 발생되는 에러라면, 로그인으로 보내는 것도 방법이다.
                // history를 사용하면, 현재 코드 안에서 로그인 페이지로 이동시킬 수 있다.
                // history.push('/login')
            }else{
                error.name = "NotAccessable";
            }
        }
        
    } else if (response.status === 206){
        // {"result":"F","resultCode":206,"resultDesc":"중복된 날짜로 작성요청 하였습니다.","content":null,"page":null,"_link":null}
        error = new Error(response.resultDesc);
        error.name = "duplicateBbsPost";
    } else if(response.status === 400){
        error = new Error("요청 값이 잘 못 되었습니다.");
        error.name = "WrongParameter";
        // location.reload(true)
    }else if(response.status === 401){
        localStorage.removeItem('user');
        error = new Error("요청하신 리소스에 접근할 권한이 없습니다. 로그인 해주세요.");
        error.name = "Unauthorized";
        // location.reload(true)
    }else if(response.status === 404){
        error = new Error("요청하신 리소스를 찾을 수 없습니다.");
        error.name = "NotFound";
    }

    if(error){
        console.log("error msg",error);
        return Promise.reject(error);
    }

    // 성공인 경우에 컨텐츠만 반환한다.
    // 성공이라고 하더라도 컨텐츠가 없이 결과만 성공으로 반환하는 경우가 있다.
    // 이런 때에는 Empty Object를 반환한다.
    return response.data.content ? response.data.content : {};
}

export const handleException = (error) => {
    // error handling
    console.log("error", error);
}