import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {loginReducer} from "../reducers/loginReducer";
import {registerReducer} from "../reducers/registerReducer";
import {forgotReducer} from "../reducers/forgotReducer";
import {newPasswordReducer} from "../reducers/newPasswordReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profileReducer} from "../reducers/profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {packsReducer} from "../reducers/packsReducer";
import {cardsReducer} from "../reducers/cardsReduser";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
	cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof store.getState>
export const useAppDispatch=()=>useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// @ts-ignore
window.store = store