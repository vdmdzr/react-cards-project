import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import style from './ForgotPasswordPage.module.css'
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";
import {validateNewPassEmailFormErrors} from "../../../utils/error-utils";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {recoveryPassTC} from "../../../reducers/forgotReducer";
import {EMAIL_TEMPLATE} from "../../../const/CONST";

const ForgotPasswordPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()


	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate: values => {
			return validateNewPassEmailFormErrors(values)
		},
		onSubmit: (values) => {
			dispatch(recoveryPassTC({email: values.email, message: EMAIL_TEMPLATE}))
			navigate(`/check-email-page/${values.email}`)
			formik.resetForm()
		},
	})


	return (
		<>
			<Grid container>
				<div className={style.background}>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={style.paper}>
							<form onSubmit={formik.handleSubmit}>
								<FormControl>
									<FormGroup>
										<h4 className={style.title}>Forgot your password?</h4>
										<TextField className={style.input}
										           label="Email" margin="none" size={'small'}
										           {...formik.getFieldProps('email')}/>
										{formik.touched.email &&
                                            <div className={style.error}>{formik.errors.email}</div>}
										<div className={style.titleEnterMail}>
											Enter your email address and we will send you further instruction
										</div>
										<Button type={'submit'} variant={'contained'} color={'primary'}
										        disabled={
											        !!((!formik.values.email)
												        || (formik.errors.email))
										        }>
											Send instruction
										</Button>
										<div className={style.question}>
											Did you remember your password?
										</div>
										<Link className={style.linkTryLoggingIn} to={'/login-page'}>
											Try logging in
										</Link>
									</FormGroup>
								</FormControl>
							</form>
						</Paper>
					</Box>
				</div>
			</Grid>
		</>
	);
};

export default ForgotPasswordPage;

