import {AppThunk} from "../store/store";
import {EmailRequestType, passAPI} from "../api/passAPI";
import {setAppErrorAC, setAppStatusAC} from "./profileReducer";

type ActionType = ReturnType<typeof recoveryPassAC>

type PassInitStateType = {
	info: string
}
const initState: PassInitStateType = {
	info: ''
}

export const forgotReducer = (state = initState, action: ActionType): PassInitStateType => {
	switch (action.type) {
		case "CONFIRM_STATUS":
			return {...state, info: action.info}
		default:
			return state
	}
}

export const recoveryPassAC = (info: string) => {
	return {type: 'CONFIRM_STATUS', info} as const
}

export const recoveryPassTC = (data: EmailRequestType): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	passAPI.sendEmail(data)
		.then(res => {
			dispatch(recoveryPassAC(res.data.info))
		})
		.catch(err => {
			dispatch(setAppErrorAC(err.response.data.error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('succeeded'))
		})
}



