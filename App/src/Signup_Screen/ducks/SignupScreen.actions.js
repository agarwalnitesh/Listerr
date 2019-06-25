import * as Action from './SignupScreen.types';

export const sendCodeAction = (type) => {
    return {
        type: Action.SEND_VERIFICATION_CODE_LOADING,
        payload: type
    }
}

export const saveLoginData = (data) => {
    return {
        type: Action.SAVE_LOGIN_SUCCESS_DATA,
        payload: data
    }
}