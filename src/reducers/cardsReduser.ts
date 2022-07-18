import {cardsAPI, CardsGetType, CardType, PostRequestType, UpdateCardType} from "../api/cardsAPI";
import {AppThunk} from "../store/store";
import {setAppStatusAC} from "./profileReducer";

type ActionType = ReturnType<typeof getCardsAC> |
    ReturnType<typeof pageCardsAC> |
    ReturnType<typeof pageCountCardsAC> |
    ReturnType<typeof totalCountCardsAC>|
	ReturnType<typeof setSearchQuestionAC>|
	ReturnType<typeof switchSortAC>

type InitStateType = typeof initState

const initState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 5,
    page: 1,
    pageCount: 10,
    packUserId: '',
	searchQuestion: '',
	switchSort: '',
}

type UpdatedGradeCard = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export const cardsReducer = (state: InitStateType = initState, action: ActionType) => {
    switch (action.type) {
        case "CARDS/GET_CARDS":
            return {...state, cards: action.cards}
        case "CARDS/GET_PAGE":
            return {...state, page: action.page}
        case "CARDS/GET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/GET_TOTAL_COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
	    case "CARDS/SET_SEARCH_QUESTION":
		    return {...state, searchQuestion: action.searchQuestion}
	    case "CARDS/SWITCH_SORT":
			return {...state, switchSort: action.switchSort}
	    default:
            return state
    }
}

//action creaters
export const switchSortAC = (switchSort: string) => {
	return {type: 'CARDS/SWITCH_SORT', switchSort} as const
}

export const getCardsAC = (cards: CardType[]) => {
    return {type: 'CARDS/GET_CARDS', cards} as const
}

export const pageCardsAC = (page: number) => {
    return {type: 'CARDS/GET_PAGE', page} as const
}

export const pageCountCardsAC = (pageCount: number) => {
    return {type: 'CARDS/GET_PAGE_COUNT', pageCount} as const
}

export const totalCountCardsAC = (cardsTotalCount: number) => {
    return {type: 'CARDS/GET_TOTAL_COUNT', cardsTotalCount} as const
}

export const setSearchQuestionAC = (searchQuestion: string) => {
	return {type: 'CARDS/SET_SEARCH_QUESTION', searchQuestion} as const}

//thunk creaters
export const getCardsTC = (data: CardsGetType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(data)
        dispatch(getCardsAC(res.data.cards))
        dispatch(pageCardsAC(res.data.page))
        dispatch(pageCountCardsAC(res.data.pageCount))
        dispatch(totalCountCardsAC(res.data.cardsTotalCount))

    } catch (error) {
	    console.log(error)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const addCardTC = (data: PostRequestType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.createCard(data)
        dispatch(getCardsTC({cardsPack_id: data.cardsPack_id, }))
    } catch (error) {
	    console.log(error)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteCardTC = (packId: string, cardId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC({cardsPack_id: packId}))
    } catch (error) {
	    console.log(error)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardTC = (data: UpdateCardType, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.updateCard(data)
        dispatch(getCardsTC({cardsPack_id: packId}))
    } catch (error) {
	    console.log(error)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const setCardGrade = (grade: number, _id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.setCardGrade(grade, _id)
        const updatedData = res.data.updatedGrade
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}




