import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {createPackTC} from "../../../../reducers/packsReducer";
import {useAppDispatch} from "../../../../store/store";
import styles from '../../../common/pages/modal/Modal.module.css'


export const AddNewPackModal = () => {

    const [name, setName] = useState('')
    const [privatePack, setPrivatePack] = useState(false)

    const dispatch = useAppDispatch()

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrivatePack(event.target.checked);
    };

    const createPackHandler = () => {
        dispatch(createPackTC({name, private: privatePack}))
        setName('')
        setPrivatePack(false)
    }

    return (
        <BasicModal operationButtonName={"ADD NEW PACK"}
                    operationName={"Add New Pack"}
                    handleOperation={createPackHandler}
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
            </div>
        </BasicModal>
    );
};

