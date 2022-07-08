import {instance} from './Instance';

export interface GetPacksResponseType {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type PackType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number,
    deckCover: null
}

export type CreatePackRequestData = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type UpdatePackRequestData = {
    _id: string
    name?: string
}

export type fetchDataType = {
    page?: number
    pageCount?: number
    user_id?: string
    packName?: string
    sortPacks?: string | number
    min?: number
    max?: number
}

export const packsAPI = {
    getPacks: (data?: fetchDataType) => {
        return instance.get<GetPacksResponseType>('cards/pack', {
            params:
                {
                    pageCount: 10,
                    ...data
                }
        })
            .then((res) => {
                return res.data
            })
    },

    createPack(data?: CreatePackRequestData) {
        return instance.post('cards/pack', {cardsPack: {
                name: "My new pack",
                ...data
            }})
            .then((res) => {
                return res.data
            })
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    },

    updatePack(data?: UpdatePackRequestData) {
        return instance.put('cards/pack', {cardsPack: {
                ...data
            }})
    }
};

