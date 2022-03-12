const reducer = (state = {}, action) => {

    switch(action.type){

        case "LOGIN": {
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userData", JSON.stringify(action.payload.userData))
            localStorage.setItem("code", JSON.stringify(action.payload.code))
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload.userData,
                code: action.payload.code
            }
        }
        case "LOGOUT": {
            localStorage.clear()


            return {
                ...state,
                isLoggedIn: false,
                userData: {},
                code: null
            }
        }
        default: {
            return state
        }

    }

}

export default reducer;