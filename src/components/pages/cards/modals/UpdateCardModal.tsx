import React, {ChangeEvent, FC, useState} from 'react';
import styles from '../../../common/pages/modal/Modal.module.css';
import {updateCardTC} from '../../../../reducers/cardsReduser';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {BasicModal} from '../../../common/pages/modal/BasicModal';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import TextField from '@mui/material/TextField';
import {InputTypeFile} from "../../../common/pages/UploadFile/InputTypeFile";
import Button from "@mui/material/Button";
import style from "../../../common/styles/FormStyles.module.css";
import {UploadPhotoType} from "../../profile/ProfilePage";


type UpdateCardModalType = {
	packid: string
	question: string
	answer: string
	cardId: string
}

export const UpdateCardModal: FC<UpdateCardModalType> = ({packid, question, answer, cardId}) => {

	let isTextOrImg
	if (question.slice(0, 11) === 'data:image/') {
		isTextOrImg = 'img'
	} else {
		isTextOrImg = 'text'
	}

	const [newQuestion, setNewQuestion] = useState(question)
	const [newAnswer, setNewAnswer] = useState(answer)
	const [photoQuestion, setPhotoQuestion] = useState('')
	const status = useAppSelector(state => state.profile.status)

	const dispatch = useAppDispatch()

	const handlerUpdateCard = () => {
		if (!photoQuestion) {
			dispatch(updateCardTC({_id: cardId, question: newQuestion, answer: newAnswer}, packid))
		}
		if (photoQuestion) {
			dispatch(updateCardTC({_id: cardId, question: photoQuestion, answer: newAnswer}, packid))
		}
	}

	const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewQuestion(e.currentTarget.value)
	}

	const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewAnswer(e.currentTarget.value)
	}

	// const onChangeTextHandler = () => {
	// 	setIsTextOrImg('text')
	// }
	//
	// const onChangeImgHandler = () => {
	// 	setIsTextOrImg('img')
	// }

	const updatePhotoHandler = (data: UploadPhotoType) => {
		//data -> {question: "data:image/base64:wirifwiuh43i3"}
		setPhotoQuestion(data.question)
	}

	return (
		<BasicModal operationButtonName={"SAVE"}
		            operationName={"Edit Pack Name"}
		            handleOperation={handlerUpdateCard}
		            openModalButton={
			            <IconButton
							disabled={status==='loading'}
				            aria-label="edit" size="small">
				            <EditIcon fontSize="inherit"/>
			            </IconButton>
		            }>
			<div>

				{/*<FormControl>*/}
				{/*	<RadioGroup*/}
				{/*		aria-labelledby="demo-radio-buttons-group-label"*/}
				{/*		defaultValue={isTextOrImg}*/}
				{/*		name="radio-buttons-group"*/}
				{/*	>*/}
				{/*		<FormControlLabel disabled value="text" label="Text question"*/}
				{/*		                  control={<Radio onChange={onChangeTextHandler}*/}
				{/*		                                  size="small"/>}/>*/}
				{/*		<FormControlLabel value="img" label="Image question"*/}
				{/*		                  control={<Radio onChange={onChangeImgHandler}*/}
				{/*		                                  size="small"/>}/>*/}
				{/*	</RadioGroup>*/}
				{/*</FormControl>*/}

				{isTextOrImg === 'text' && <p><TextField
                    type="text"
                    id="standard-basic"
                    className={styles.input}
                    label="Question Name"
                    variant="standard"
                    value={newQuestion}
                    onChange={onChangeQuestionHandler}
                /></p>}

				{isTextOrImg === 'img' && <p>
                    <InputTypeFile updatePhotoHandler={updatePhotoHandler} keyPhotoField={'question'}>
                        <Button component="span"
                                sx={{'marginTop': '11px'}}
                                variant="contained">
                            upload image question
                        </Button>
						{(photoQuestion)
							? <img className={style.imgModal} src={photoQuestion}/>
							: null
						}
                    </InputTypeFile>
                </p>}

				<TextField
					type="text"
					id="standard-basic"
					className={styles.input}
					label="Answer Name"
					value={newAnswer}
					onChange={onChangeAnswerHandler}
				/>

			</div>
		</BasicModal>
	)
}

