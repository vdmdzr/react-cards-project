import React, {ChangeEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {addCardTC} from '../../../../reducers/cardsReduser';
import {UploadPhotoType} from '../../profile/ProfilePage';
import {useAppDispatch} from '../../../../store/store';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import styles from '../../../common/pages/modal/Modal.module.css';
import {InputTypeFile} from '../../../common/pages/UploadFile/InputTypeFile';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import style from '../../../common/styles/FormStyles.module.css'

const AddNewCardModal = () => {

		const [nameQuestion, setNameQuestion] = useState('')
		const [nameAnswer, setNameAnswer] = useState('')
		const [switchRadio, setSwitchRadio] = useState(true)//true - text field, false - upload img
		const [photoQuestion, setPhotoQuestion] = useState('')

		const {packid} = useParams()

		const dispatch = useAppDispatch()

		const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setNameQuestion(e.currentTarget.value)
		}

		const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setNameAnswer(e.currentTarget.value)
		}

		const createCardHandler = () => {
			if (packid && nameAnswer && nameQuestion && !photoQuestion) {
				dispatch(addCardTC({cardsPack_id: packid, answer: nameAnswer, question: nameQuestion}))
			}
			if (packid && nameAnswer && photoQuestion) {
				dispatch(addCardTC({cardsPack_id: packid, answer: nameAnswer, question: photoQuestion}))
			}
			setNameQuestion('')
			setNameAnswer('')
			setPhotoQuestion('')
			setSwitchRadio(true)
		}

		const onChangeTextHandler = () => {
			setPhotoQuestion('')
			setNameQuestion('')
			setSwitchRadio(true)
		}

		const onChangeImgHandler = () => {
			setNameQuestion('')
			setSwitchRadio(false)
		}

		const updatePhotoHandler = (data: UploadPhotoType) => {
			//data -> {question: "data:image/base64:wirifwiuh43i3"}
			setPhotoQuestion(data.question)
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

					<FormControl>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="text"
							name="radio-buttons-group"
						>
							<FormControlLabel value="text" label="Text question"
							                  control={<Radio onChange={onChangeTextHandler}
							                                  size="small"/>}/>
							<FormControlLabel value="img" label="Image question"
							                  control={<Radio onChange={onChangeImgHandler}
							                                  size="small"/>}/>
						</RadioGroup>
					</FormControl>

					{switchRadio && <p><TextField
                        type="text"
                        id="standard-basic"
                        className={styles.input}
                        label="Question Name"
                        variant="standard"
                        value={nameQuestion}
                        onChange={onChangeQuestionHandler}
                    /></p>}

					{!switchRadio && <p>
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
	}
;

export default AddNewCardModal;

