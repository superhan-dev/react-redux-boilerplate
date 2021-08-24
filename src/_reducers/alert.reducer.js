import {alertConstants} from '../_constants';

/**
 * alert type 수정
 * notisnack 라이브러리 사용을 위해 type의 리턴값에서 alert를 제거합니다.
 */
export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                // type: 'alert-success',
                type: 'success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                // type: 'alert-error',
                type: 'error',
                message: action.message
            };
        case alertConstants.INFO:
            return {
                // type: 'alert-info',
                type: 'info',
                message: action.message
            };
        case alertConstants.WARNING:
            return {
                // type: 'alert-warning',
                type: 'warning',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}