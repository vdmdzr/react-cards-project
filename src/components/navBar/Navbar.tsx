import React from 'react';
import style from './Navbar.module.css';
import NavbarItem from "./NavBarComponents/NavbarItem";

const Navbar = () => {
    return (
        // <div className='Left-bar'>
        //     <nav className={classes.Navbar}>
        //         <NavbarItem item={'forgot-password-page'} title={'ForgotPasswordPage'} />
        //         <NavbarItem item={'login-page'} title={'LoginPage'}/>
        //         <NavbarItem item={'new-password-page'} title={'NewPasswordPage'}/>
        //         <NavbarItem item={'profile-page'} title={'ProfilePage'}/>
        //         <NavbarItem item={'register-page'} title={'RegisterPage'}/>
        //         <NavbarItem item={'test-page'} title={'TestPage'}/>
        //     </nav>
		//
        // </div>



	<div>
		<nav className={style.navbar}>
			<div className={style.menu}>
				<NavbarItem item={'forgot-password-page'} title={'ForgotPasswordPage'}/>
				<NavbarItem item={'new-password-page'} title={'NewPasswordPage'}/>
				<NavbarItem item={'/'} title={'ProfilePage'}/>
				<NavbarItem item={'register-page'} title={'RegisterPage'}/>
			</div>

		</nav>
	</div>
    );
};

export default Navbar;

