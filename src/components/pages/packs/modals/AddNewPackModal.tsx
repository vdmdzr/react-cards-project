import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {createPackTC} from "../../../../reducers/packsReducer";
import {useAppDispatch} from "../../../../store/store";
import styles from '../../../common/pages/modal/Modal.module.css'
import {InputTypeFile} from "../../../common/pages/UploadFile/InputTypeFile";
import {UploadPhotoType} from "../../profile/ProfilePage";


export const AddNewPackModal = () => {

    const [name, setName] = useState('')
    const [privatePack, setPrivatePack] = useState(false)
    const [deckCover, setDeckCover] = useState('')

    const dispatch = useAppDispatch()

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrivatePack(event.target.checked);
    };

    const createPackHandler = () => {
        dispatch(createPackTC({name, private: privatePack, deckCover}))
        setName('')
        setPrivatePack(false)
        setDeckCover('')
    }

    const updatePhotoHandler = (data: UploadPhotoType) => {
        setDeckCover(data.deckCover)
    }


    return (
        <BasicModal operationButtonName={"ADD NEW PACK"}
                    operationName={"Add New Pack"}
                    handleOperation={createPackHandler}
                    disabled={!name}
                    openModalButton={
                        <Button variant="contained" color="primary">
                            Add New Pack
                        </Button>
                    }>
            <div>
                <TextField
                    type="text"
                    id="standard-basic"
                    className={styles.input}
                    label="Pack Name"
                    variant="standard"
                    required={true}
                    value={name}
                    onChange={onchangeHandler}
                />

                <div className={styles.checkbox}>
                    <FormControlLabel
                        label={'private'}
                        control={
                            <Checkbox
                                checked={privatePack}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        }
                    />
                </div>
                <div className={styles.imgPreviewContainer}>
                    <div className={styles.imgPreview}>
                        <div className={styles.coverPreviewFieldText}>Pack Cover Preview</div>
                    </div>
                    <div className={styles.previewContainer}><img className={styles.preview} src={deckCover}/></div>

                </div>
                <InputTypeFile updatePhotoHandler={updatePhotoHandler} keyPhotoField={'deckCover'}>
                    <Button className={styles.coverButton} variant="contained" color="primary" component={'span'}>
                        Add Cover
                    </Button>
                </InputTypeFile>

            </div>
        </BasicModal>
    );
};

