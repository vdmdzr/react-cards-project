import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import React, {ChangeEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {addCardTC} from '../../../../reducers/cardsReduser';
import {useAppDispatch} from '../../../../store/store';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import styles from '../../../common/pages/modal/Modal.module.css'

const AddNewCardModal = () => {

	const [nameQuestion, setNameQuestion] = useState('')
	const [nameAnswer, setNameAnswer] = useState('')

	const {packid} = useParams()

	const dispatch = useAppDispatch()

	const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNameQuestion(e.currentTarget.value)
	}

	const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNameAnswer(e.currentTarget.value)
	}

	const createCardHandler = () => {
		if (packid && nameAnswer && nameQuestion) {
			dispatch(addCardTC({cardsPack_id: packid, answer: nameAnswer, question: nameQuestion}))
			setNameQuestion('')
			setNameAnswer('')
		}
	}

	return (

		<BasicModal operationButtonName={'ADD NEW CARD'}
		            operationName={'Add New Card'}
		            handleOperation={createCardHandler}
		            openModalButton={
			            <Button variant="contained" color="primary">
				            Add New Card
			            </Button>
		            }
		>
			<div>
				<p><TextField
					type="text"
					id="standard-basic"
					className={styles.input}
					label="Question Name"
					variant="standard"
					value={nameQuestion}
					onChange={onChangeQuestionHandler}
				/></p>

				<p><TextField
					type="text"
					id="standard-basic"
					className={styles.input}
					label="Answer Name"
					variant="standard"
					value={nameAnswer}
					onChange={onChangeAnswerHandler}
				/></p>
			</div>

		</BasicModal>
	);
};

export default AddNewCardModal;

