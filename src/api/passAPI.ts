import {instance} from "./Instance";

type PassResponseType = {
	info: string
	error: string
}

//то что мы отправляем на сервак
export type EmailRequestType = {
	email: string
	message: string
}

export type NewPasswordType = {
	password: string
	resetPasswordToken: string|undefined
}

type NewPasswordResponseType = {
	info: string
	error: string
}

export const passAPI = {
	sendEmail(data: EmailRequestType) {
		return instance.post<PassResponseType>('/auth/forgot', data)
	},
	newPass(data: NewPasswordType) {
		return instance.post<NewPasswordResponseType>('/auth/set-new-password', data)
	}
}