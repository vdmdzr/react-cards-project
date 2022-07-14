import React, {ChangeEvent, FC, useState} from 'react';
import styles from '../../../common/pages/modal/Modal.module.css';
import {updateCardTC} from '../../../../reducers/cardsReduser';
import {useAppDispatch} from '../../../../store/store';
import {BasicModal} from '../../../common/pages/modal/BasicModal';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import TextField from '@mui/material/TextField';


type UpdateCardModalType = {
	packid: string
	question: string
	answer: string
	cardId: string
}

export const UpdateCardModal: FC<UpdateCardModalType> = ({packid, question, answer, cardId}) => {

	const [newQuestion, setNewQuestion] = useState(question)
	const [newAnswer, setNewAnswer] = useState(answer)

	const dispatch = useAppDispatch()

	const handlerUpdateCard = () => {
		dispatch(updateCardTC({
			_id: cardId,
			question: newQuestion,
			answer: newAnswer
		}, packid))
	}

	const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewQuestion(e.currentTarget.value)
	}

	const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewAnswer(e.currentTarget.value)
	}

	return (
		<BasicModal operationButtonName={"SAVE"}
		            operationName={"Edit Pack Name"}
		            handleOperation={handlerUpdateCard}
		            openModalButton={
			            <IconButton
				            aria-label="edit" size="small">
				            <EditIcon fontSize="inherit"/>
			            </IconButton>
		            }>
			<div>
				<TextField
					type="text"
					id="standard-basic"
					className={styles.input}
					label="Question Name"
					variant="standard"
					value={newQuestion}
					onChange={onChangeQuestionHandler}
				/>

				<TextField
					type="text"
					id="standard-basic"
					className={styles.input}
					label="Answer Name"
					variant="standard"
					value={newAnswer}
					onChange={onChangeAnswerHandler}
				/>

			</div>
		</BasicModal>
	);
};

