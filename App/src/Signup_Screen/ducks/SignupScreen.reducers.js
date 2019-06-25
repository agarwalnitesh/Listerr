import * as Action from './SignupScreen.types';

const initialState = {
    loading: false,
    loginSuccess: {}
}

export default function SignupReducer(state = initialState, action) {
    switch (action.type) {
        case Action.SEND_VERIFICATION_CODE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case Action.SAVE_LOGIN_SUCCESS_DATA:
            return {
                ...state,
                loginSuccess: action.payload
            }
        default:
            return state

    }

} 