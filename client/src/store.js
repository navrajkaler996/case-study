import { createStore } from "redux";
import reducer from "./reducers/reducer"

const rootReducer = reducer
const initialState = {

    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
     userData: JSON.parse(localStorage.getItem("userData")) || null,
     code: JSON.parse(localStorage.getItem("code")) || null,
     clientId: process.env.REACT_APP_CLIENT_ID,
     redirectURL: process.env.REACT_APP_REDIRECT_URL,
     clientSecret: process.env.REACT_APP_CLIENT_SECRET,
     proxy: process.env.REACT_APP_PROXY
}
const store  = createStore(rootReducer, initialState)

export default store;