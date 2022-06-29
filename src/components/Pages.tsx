import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Error404Page from "./pages/Error404Page";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/forgot/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CheckEmail from "./pages/forgot/CheckEmail";
import NewPasswordPage from "./pages/forgot/NewPasswordPage";


export const PATH = {
	FORGOT_PASSWORD_PAGE: '/forgot-password-page',
	ERROR_404_PAGE: '/error-404-page',
	LOGIN_PAGE: '/login-page',
	NEW_PASSWORD_PAGE: '/new-password-page',
	PROFILE_PAGE: '/',
	REGISTER_PAGE: '/register-page',
	TEST_PAGE: '/test-Page',
	CHECK_EMAIL: '/check-email/:email'
}

const Pages = () => {
	return (
		<div>
			<Routes>
				<Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
				<Route path={PATH.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage/>}/>
				<Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage/>}/>
				<Route path={PATH.REGISTER_PAGE} element={<RegisterPage/>}/>
				<Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
				<Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
				<Route path={'/*'} element={<Error404Page/>}/>
			</Routes>
		</div>
	);
};

export default Pages;