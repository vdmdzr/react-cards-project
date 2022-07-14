import {AuthAPI, changeNameType, ProfileResponseType} from "../api/loginAPI";
import {setIsLoggedInAC} from "./loginReducer";
import {AppThunk} from "../store/store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
    profile: {} as ProfileResponseType,
    userId: '',
}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action:
    AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {...state, status: action.status}
        case 'APP-SET-ERROR':
            return {...state, error: action.error}
        case 'APP-SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'SET-PROFILE':
            return {...state, profile: action.profile}
        case 'APP-UPDATE-USER-NAME':
            return {...state, profile: {...state.profile, name: action.newName}}
        case 'profile/SAVE-USER-ID':
            return {...state, userId: action.userId}

        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP-SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP-SET-ERROR',
        error
    } as const
}

export const setAppIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP-SET-IS-INITIALIZED',
        isInitialized
    } as const
}

export const setProfileAC = (profile: ProfileResponseType) => {
    return {
        type: 'SET-PROFILE',
        profile
    } as const
}

export const updateUserNameAC = (newName: string) => {
    return {
        type: 'APP-UPDATE-USER-NAME',
        newName
    } as const
}

export const saveUserIdAC = (userId: string) => {
    return {
        type: 'profile/SAVE-USER-ID',
        userId
    } as const
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.me().then((res) => {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(saveUserIdAC(res._id))
        dispatch(setProfileAC(res))
    })
        .finally(() => {
            dispatch(setAppIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const updateUserNameTC = (data: changeNameType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.updateProfile(data).then(() => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(updateUserNameAC(data.name))
    })
        .catch((error) => {
            console.log(error.message)
        })
        .finally(() => {
            dispatch(setAppIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export type SetAppActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>
export type updateUserNameType = ReturnType<typeof updateUserNameAC>
export type setProfileType = ReturnType<typeof setProfileAC>
export type saveUserIdACType = ReturnType<typeof saveUserIdAC>


export type AuthActionsType = SetAppActionType
    | SetAppErrorActionType
    | setAppIsInitializedType
    | setProfileType
    | updateUserNameType
    | saveUserIdACType
