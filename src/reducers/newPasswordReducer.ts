import {AppThunk} from "../store/store";
import {setAppErrorAC, setAppStatusAC} from "./profileReducer";
import {NewPasswordType, passAPI} from "../api/passAPI";

type ActionType = ReturnType<typeof passChangeAC>
type InitStateType = {
	info: string
	isPassChanged: boolean
}

const initState: InitStateType = {
	info: '',
	isPassChanged: false
}

export const newPasswordReducer = (state = initState, action: ActionType): InitStateType => {
	switch (action.type) {
		case "NEW_PASSWORD":
			return {...state, info: action.info, isPassChanged: action.isPassChanged}
		default:
			return state
	}
}

export const passChangeAC = (info: string, isPassChanged: boolean) => {
	return {type: 'NEW_PASSWORD', info, isPassChanged} as const
}

export const newPassTC = (data: NewPasswordType): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	passAPI.newPass(data)
		.then(res => {
			dispatch(passChangeAC(res.data.info, true))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setAppErrorAC(err.response.data.error))
			}
		})
		.finally(()=>{
			dispatch(setAppStatusAC('succeeded'))
		})

}

