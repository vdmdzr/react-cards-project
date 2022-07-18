import React from 'react';
import style from './Navbar.module.css';
import {Navigate} from "react-router-dom";
import {logoutTC} from "../../reducers/loginReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {PATH} from "../pages/Pages";
import LinearProgress from "@mui/material/LinearProgress";
import NavbarItem from "./navBarComponents/NavbarItem";


const Navbar = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const status = useAppSelector(state => state.profile.status)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (
        <div>
            <nav className={style.navbar}>
                <div className={style.menu}>
                    <NavbarItem item={'profile-page'} title={'Profile'}/>
                    <NavbarItem item={'packs-page'} title={'Packs'}/>
                    {/*<NavbarItem item={'test-page'} title={'Tests'}/>*/}
                </div>
                <div onClick={logoutHandler} className={style.loginBlock}>Logout <div className={style.logoutIcon}>&#9094;</div></div>
            </nav>
            {status === 'loading' && <LinearProgress/>}
        </div>
    );
};

export default Navbar;

