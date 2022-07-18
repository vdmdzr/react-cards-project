import {instance} from "./Instance";


export type CardType = {
	answer: string
	question: string
	cardsPack_id: string
	grade: number
	shots: number
	user_id: string
	created: string
	updated: string
	_id: string
}

export type CardsGetType = {
	cardsPack_id: string
	cardAnswer?: string // не обязательно
	cardQuestion?: string // не обязательно
	min?: number// не обязательно
	max?: number // не обязательно
	sortCards?: string // не обязательно
	page?: number// не обязательно
	pageCount?: number// не обязательно
}

export type CardResponseType = {
	cards: CardType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
}

export type PostRequestType = {
	cardsPack_id: string
	question?: string // если не отправить будет таким
	answer?: string // если не отправить будет таким
	grade?: number // 0..5, не обязателен
	shots?: number // не обязателен
	answerImg?: string // не обязателен
	questionImg?: string // не обязателен
	questionVideo?: string // не обязателен
	answerVideo?: string // не обязателен
}

export type UpdateCardType = {
	_id: string
	question?: string // не обязательно
	comments?: string// не обязательно
	answer?: string // если не отправить будет таким

}

export const cardsAPI = {
	getCards: (data: CardsGetType) => {
		return instance
			.get<CardResponseType>('/cards/card', {params: {pageCount: 10, ...data}})
	},
		createCard(data: PostRequestType) {
			return instance.post('/cards/card', {
				card: {...data, question: data.question, answer: data.answer}
			})
		},
	deleteCard: (cardId: string) => {
		return instance.delete(`/cards/card?id=${cardId}`)
	},
	updateCard: (data: UpdateCardType) => {
		return instance.put('/cards/card', {card: data})
	},
	setCardGrade(grade: number, card_id: string) {
		return instance.put('/cards/grade', {grade, card_id})
	},
}
