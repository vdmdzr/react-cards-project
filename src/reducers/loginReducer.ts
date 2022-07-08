import {AuthAPI, LoginParamsType} from "../api/loginAPI";
import {handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC, setProfileAC} from "./profileReducer";
import {AppThunk} from "../store/store";

const initialState = {
    isLoggedIn: false,
    loginUserId: '',
}

export type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        case 'login/SAVE-USER-ID':
            return {...state, loginUserId: action.userId}

        default:
            return state
    }
}

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(saveUserIdAC(res._id))
            dispatch(setProfileAC(res))
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e.message)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const saveUserIdAC = (userId: string) => ({type: 'login/SAVE-USER-ID', userId} as const)
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof saveUserIdAC>
