import {instance} from "./Instance";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LogoutResponseType = {
    info: string
}

export type ProfileResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type changeNameType = {
    newName: string,
    avatar: string | undefined
}

export const AuthAPI = {
    login: (data: LoginParamsType) => {
        return instance.post('/auth/login', data)
            .then((res) => {
                return res.data
            })
    },

    logout: () => {
        return instance.delete<LogoutResponseType>('/auth/me')
            .then((res) => {
                return res.data
            })
    },

    me: () => {
        return instance.post<ProfileResponseType>('auth/me')
            .then((res) => {
                return res.data
            })
    },

    updateProfile: (data:changeNameType) => {
        return instance.put('auth/me', data)
            .then((res) => {
                return res.data
            })
    }
}

