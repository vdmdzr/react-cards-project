import {combineReducers, legacy_createStore} from "redux";
import {loginReducer} from "../reducers/loginReducer";
import {registerReducer} from "../reducers/registerReducer";
import {profileReducer} from "../reducers/profileReducer";
import {forgotReducer} from "../reducers/forgotReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    forgot: forgotReducer,
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
