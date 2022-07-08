import {instance} from "./Instance";


export type RegisterRequestDataType = {
    email: string,
    password: string
}

export type RegisterResponseType = {
    error?: string
}

export const RegisterAPI = {
    register(data:RegisterRequestDataType) {
        return instance.post<RegisterResponseType>('/auth/register', data)
    }
}