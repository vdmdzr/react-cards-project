import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import {Button, IconButton, TextField} from "@mui/material";
import {updatePackTC} from "../../../../reducers/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import styles from '../../../common/pages/modal/Modal.module.css'
import EditIcon from "@mui/icons-material/Edit";
import {InputTypeFile} from "../../../common/pages/UploadFile/InputTypeFile";
import {UploadPhotoType} from "../../profile/ProfilePage";
import style from "../../forgotPass/ForgotPasswordPage.module.css";

type UpdatePackPropsType = {
    _id: string
    userId: string
    page: number
    pageCount: number
    sortPacks: string
    min: number
    max: number
    name: string
    deckCover: string | null
}

export const UpdatePackModal = (props: UpdatePackPropsType) => {

    const [newName, setNewName] = useState(props.name)
    const [deckCover, setDeckCover] = useState(props.deckCover)
    const status = useAppSelector(state => state.profile.status)
    const dispatch = useAppDispatch()

    const onchangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const UpdatePackHandler = () => {
        if (deckCover) {
            dispatch(updatePackTC({_id: props._id, name: newName, deckCover},
                {
                    user_id: props.userId,
                    page: props.page,
                    pageCount: props.pageCount,
                    sortPacks: props.sortPacks,
                    min: props.min,
                    max: props.max,
                    name: newName,
                }
            ))
        }

        if (!deckCover) {
            dispatch(updatePackTC({_id: props._id, name: newName},
                {
                    user_id: props.userId,
                    page: props.page,
                    pageCount: props.pageCount,
                    sortPacks: props.sortPacks,
                    min: props.min,
                    max: props.max,
                    name: newName,
                }
            ))
        }
    }

    const updatePhotoHandler = (data: UploadPhotoType) => {
        setDeckCover(data.deckCover)
    }


    return (

        <>
            <BasicModal operationButtonName={"SAVE"}
                        operationName={"Edit Pack Name"}
                        handleOperation={UpdatePackHandler}
                        openModalButton={
                            <IconButton
                                disabled={status==='loading'}
                                aria-label="delete" size="small">
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }>
                <div>

                    <TextField
                        type="text"
                        id="standard-basic"
                        className={styles.input}
                        label="Pack Name"
                        value={newName}
                        onChange={onchangeNameHandler}
                    />

                </div>

                <div className={styles.imgPreviewContainer}>
                    <div className={styles.imgPreview}>
                        <div className={styles.coverPreviewFieldText}>Pack Cover Preview</div>
                    </div>
                    {deckCover
                        ?
                        <div className={styles.previewContainer}><img className={styles.preview} src={deckCover}/></div>
                        : null
                    }

                </div>
                <InputTypeFile updatePhotoHandler={updatePhotoHandler} keyPhotoField={'deckCover'}>
                    <Button className={styles.coverButton} variant="contained" color="primary" component={'span'}>
                        Edit Cover
                    </Button>
                </InputTypeFile>
            </BasicModal>

        </>
    );
};

