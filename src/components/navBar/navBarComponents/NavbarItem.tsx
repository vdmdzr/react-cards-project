import React from 'react';
import classes from "../Navbar.module.css";
import {NavLink} from "react-router-dom";

type NavbarItemPropsType = {
    item: string
    title: string
}

const NavbarItem = (props: NavbarItemPropsType) => {
    return (
        <div className={classes.item}><NavLink to={`/${props.item}`}>{props.title}</NavLink></div>

    );
};

export default NavbarItem;