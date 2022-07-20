import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import style from "./Profile.module.css"
import Navbar from "../../navbar/Navbar";
import EditableSpan from "../../common/pages/EditableSpan";
import {updateUserNameTC} from "../../../reducers/profileReducer";
import {changeNameType} from "../../../api/loginAPI";
import Avatar from "../../../assets/images/avatar.jpg"
import {InputTypeFile} from "../../common/pages/UploadFile/InputTypeFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {IconButton} from "@mui/material";

export type UploadPhotoType = {
    [key: string]: string
}

const ProfilePage = () => {

    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const profile = useAppSelector(state => state.profile.profile)
    const avatar = useAppSelector(state => state.profile.profile.avatar)
    const dispatch = useAppDispatch()

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Picture is broken')
    }

    const updatePhotoHandler = (data: UploadPhotoType) => {
        dispatch(updateUserNameTC(data))
    }

    return (
        <div>
            <Navbar/>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <div className={style.profileContainer}>
                        <div className={style.profile}>

                            <div className={style.innerContainer}>
                                {avatar && !isAvaBroken ?
                                    <div className={style.avatarBlock}>
                                        <div className={style.avatar}>
                                            <img alt={'avatar'}
                                                 className={style.photo}
                                                 src={profile.avatar}
                                                 onError={errorHandler}
                                            />
                                        </div>

                                    </div>
                                    : <div>
                                        <img alt={'avatar'} className={style.photo} src={Avatar}/>
                                    </div>}
                                <InputTypeFile updatePhotoHandler={updatePhotoHandler} keyPhotoField={'avatar'}>
                                    <IconButton
                                        component="span"
                                        size={'small'}
                                    >
                                        <UploadFileIcon className={style.uploadIcon}/>
                                    </IconButton>
                                </InputTypeFile>

                                <div className={style.name}><b>Имя: </b>
                                    <EditableSpan
                                        title={profile.name}
                                        onChange={(newValue) => {
                                            const newData: changeNameType = {avatar: profile.avatar, name: newValue}
                                            dispatch(updateUserNameTC(newData))
                                        }}/>
                                </div>
                                <div className={style.email}><b>E-mail:</b> {profile.email}</div>
                                <div className={style.cardPacks}><b>Количество созданных
                                    колод:</b> {profile.publicCardPacksCount}</div>
                            </div>
                        </div>
                        <div className={style.cards}> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;