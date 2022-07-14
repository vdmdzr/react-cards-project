import {AppThunk} from '../store/store';
import {setAppStatusAC} from "./profileReducer";
import {CreatePackRequestData, FetchDataType, packsAPI, PackType, UpdatePackRequestData} from "../api/packsAPI";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

type InitialStateType = typeof initialState

const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            user_name: '',
            private: false,
            name: '',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 0,
            type: '',
            rating: 0,
            created: '',
            updated: '',
            more_id: '',
            __v: 0,
            deckCover: null
        }
    ],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: "",
    tokenDeathTime: 0,
    min: 0,
    max: 110,
    userId: '',
    packName: '',
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        case 'packs/SAVE-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'packs/SAVE-PAGE':
            return {...state, page: action.page}
        case 'packs/SAVE-MIN-SLIDER-VALUE':
            return {...state, min: action.min}
        case 'packs/SAVE-MAX-SLIDER-VALUE':
            return {...state, max: action.max}
        case 'packs/SAVE-USER-ID':
            return {...state, userId: action.userId}
        case 'packs/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case 'packs/SAVE-MAX-CARDS-COUNT':
            return {...state, maxCardsCount: action.maxCardsCount}
        default:
            return state
    }
}

export const getPacksTC = (data?: FetchDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getPacks(data)
        dispatch(setPacksAC(res.cardPacks))
        dispatch(savePageCountAC(res.pageCount))
        dispatch(savePageAC(res.page))
        dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount))
        dispatch(saveMaxCardsCountAC(res.maxCardsCount))
    } catch (error) {
        handleServerNetworkError(dispatch, (error as AxiosError).message)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPackTC = (data: CreatePackRequestData, getData?: FetchDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.createPack(data)
        dispatch(getPacksTC(getData))
    } catch (error) {
        handleServerNetworkError(dispatch, (error as AxiosError).message)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deletePackTC = (packId: string, getData?: FetchDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.deletePack(packId)
        dispatch(getPacksTC(getData))
    } catch (error) {
        handleServerNetworkError(dispatch, (error as AxiosError).message)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const updatePackTC = (data: UpdatePackRequestData, getData?: FetchDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.updatePack(data)
        dispatch(getPacksTC(getData))
    } catch (error) {
        handleServerNetworkError(dispatch, (error as AxiosError).message)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const setPacksAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS', packs} as const)
export const savePageCountAC = (pageCount: number) => ({type: 'packs/SAVE-PAGE-COUNT', pageCount} as const)
export const savePageAC = (page: number) => ({type: 'packs/SAVE-PAGE', page} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'packs/SET-CARD-PACKS-TOTAL-COUNT',
    cardPacksTotalCount
} as const)
export const saveMinAC = (min: number) => ({type: 'packs/SAVE-MIN-SLIDER-VALUE', min} as const)
export const saveMaxAC = (max: number) => ({type: 'packs/SAVE-MAX-SLIDER-VALUE', max} as const)
export const saveMaxCardsCountAC = (maxCardsCount: number) => ({type: 'packs/SAVE-MAX-CARDS-COUNT', maxCardsCount} as const)
export const saveUserIdAC = (userId: string) => ({type: 'packs/SAVE-USER-ID', userId} as const)

type ActionType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof savePageCountAC>
    | ReturnType<typeof savePageAC>
    | ReturnType<typeof saveMinAC>
    | ReturnType<typeof saveMaxAC>
    | ReturnType<typeof saveUserIdAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof saveMaxCardsCountAC>


