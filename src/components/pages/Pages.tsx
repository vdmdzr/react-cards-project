import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import ProfilePage from "./profile/ProfilePage";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import ForgotPasswordPage from "./forgotPass/ForgotPasswordPage";
import CheckEmail from "./forgotPass/CheckEmail";
import NewPasswordPage from "./newPass/NewPasswordPage";
import Tests from "./Tests";
import {Cards} from "./cards/Cards";
import {Packs} from "./packs/Packs";
import {LearnPage} from "./learn/LearnPage";


export const PATH = {
	FORGOT_PASSWORD_PAGE: '/forgot-password-page',
	ERROR_404_PAGE: '/error-404-page',
	LOGIN_PAGE: '/login-page',
	NEW_PASSWORD_PAGE: '/new-password-page',
	PROFILE_PAGE: '/profile-page',
	REGISTER_PAGE: '/register-page',
	CHECK_EMAIL_PAGE: '/check-email-page/:email',
	TEST_PAGE: '/test-page',
	CARDS_PAGE: '/cards-page/:packid/:packname',
	PACKS_PAGE: '/packs-page',
	LEARN_PAGE: '/learn-page/:packid/:packname',
}

const Pages = () => {
	return (
		<div>
			<Routes>
				<Route path={'/'} element={<Navigate to={'/login-page'}/>}/>
				<Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
				<Route path={PATH.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage/>}/>
				<Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage/>}/>
				<Route path={PATH.REGISTER_PAGE} element={<RegisterPage/>}/>
				<Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
				<Route path={PATH.CHECK_EMAIL_PAGE} element={<CheckEmail/>}/>
				<Route path={PATH.TEST_PAGE} element={<Tests/>}/>
				<Route path={PATH.CARDS_PAGE} element={<Cards/>}/>
				<Route path={PATH.PACKS_PAGE} element={<Packs/>}/>
				<Route path={PATH.LEARN_PAGE} element={<LearnPage/>}/>
				<Route path={'/set-new-password/'}>
					<Route index element={<div><NewPasswordPage/></div>}/>
					<Route path={':token'} element={<div><NewPasswordPage/></div>}/>
				</Route>
				<Route path={PATH.ERROR_404_PAGE} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
					404: PAGE NOT FOUND
				</h1>}/>
				<Route path={'*'} element={<Navigate to={PATH.ERROR_404_PAGE}/>}/>
			</Routes>
		</div>
	);
};





export default Pages;