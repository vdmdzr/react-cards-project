import React from 'react';
import classes from './Navbar.module.css';
import {NavbarItem} from "./NavbarItem";


const Navbar = () => {
	return (
		<div className='Left-bar'>
			<nav className={classes.Navbar}>
				<NavbarItem item={'forgot-password-page'} title={'ForgotPasswordPage'} />
				<NavbarItem item={'login-page'} title={'LoginPage'}/>
				<NavbarItem item={'new-password-page'} title={'NewPasswordPage'}/>
				<NavbarItem item={'profile-page'} title={'ProfilePage'}/>
				<NavbarItem item={'register-page'} title={'RegisterPage'}/>
				<NavbarItem item={'test-page'} title={'TestPage'}/>
			</nav>

		</div>
	);
};

export default Navbar;