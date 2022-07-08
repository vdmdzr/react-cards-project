import {RegisterAPI, RegisterRequestDataType} from "../api/registerAPI";
import {handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "./profileReducer";
import {AppThunk} from "../store/store";

const initialState = {
    success: false
}

export type RegisterInitialStateType = typeof initialState

export const registerReducer = (state: RegisterInitialStateType = initialState, action: RegisterActionsType): RegisterInitialStateType => {
    switch (action.type) {
        case "REGISTER-NEW-USER": {
            return {...state, success: action.success}
        }
        default:
            return state
    }
}

export const registerAC = (success: boolean) => {
    return {
        type: 'REGISTER-NEW-USER',
        success,
    } as const
}

type SetIsLoggedInType = ReturnType<typeof registerAC>
export type RegisterActionsType = SetIsLoggedInType

export const registerTC = (data: RegisterRequestDataType): AppThunk=>(dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    RegisterAPI.register(data)
        .then(()=>{
            dispatch(registerAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error)=>{
            handleServerNetworkError(dispatch, error.message)
        })
}

