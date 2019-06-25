const initialState = {
    loading: false
}

export default function DashboardReducer(state = initialState, action) {
    switch (action.type) {
        case 'Loading_Enabled':
            return {
                ...state,
                loading: true
            };
        default:
            return state

    }

}