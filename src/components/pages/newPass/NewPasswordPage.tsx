import React from 'react';
import "./NewPasswordPage.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {validateNewPassFormErrors} from "../../../utils/error-utils";
import {useAppDispatch} from "../../../store/store";
import {newPassTC} from "../../../reducers/newPasswordReducer";

type StatePassword = {
	password: string;
	showPassword: boolean;
}
type StateConfirmPassword = {
	confirmPassword: string;
	showConfirmPassword: boolean;
}

const NewPasswordPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {token} = useParams()

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: values => {
			return validateNewPassFormErrors(values)
		},
		onSubmit: values => {
			if (formik.initialValues.password === formik.initialValues.confirmPassword) {
				dispatch(newPassTC({password: values.password, resetPasswordToken: token}));
			}
			navigate('/login-page')
		},
	})

	const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
		password: '',
		showPassword: true,
	});
	const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
		confirmPassword: '',
		showConfirmPassword: true,
	});
	const handleClickShowPassword = () => {
		setValuesPassword({
			...valuesPassword,
			showPassword: !valuesPassword.showPassword,
		});
	};
	const handleClickShowConfirmPassword = () => {
		setValuesConfirmPassword({
			...valuesConfirmPassword,
			showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
		});
	};
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}

	return (
		<>
			<Grid container>
				<div className={'background'}>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={'paper'}>
							<form onSubmit={formik.handleSubmit}>
								<FormControl>
									<h4 className={'title'}>Create new password</h4>
									<OutlinedInput
										id="password"
										type={valuesPassword.showPassword ? 'password' : 'text'}
										name="password"
										size='small'
										placeholder={'New password'}
										onBlur={(e) => formik.setFieldTouched('password', true)}
										onChange={formik.handleChange}
										value={formik.values.password}
										autoComplete="on"
										error={formik.touched.password && Boolean(formik.errors.password)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}>
													{valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
								{formik.errors.password && formik.touched.password &&
                                    <div className={'error'}>{formik.errors.password}</div>}

								<FormControl>
									<h4 className={'title'}>Repeat new password</h4>
									<OutlinedInput
										id="confirmPassword"
										type={valuesConfirmPassword.showConfirmPassword ? 'password' : 'text'}
										name="confirmPassword"
										size='small'
										placeholder={'Repeat new password'}
										onBlur={(e) => formik.setFieldTouched('confirmPassword', true)}
										onChange={formik.handleChange}
										value={formik.values.confirmPassword}
										autoComplete="on"
										error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility1"
													onClick={handleClickShowConfirmPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{valuesConfirmPassword.showConfirmPassword ? <VisibilityOff/> :
														<Visibility/>}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>

								{formik.errors.confirmPassword && formik.touched.confirmPassword &&
                                    <div className={'error'}>{formik.errors.confirmPassword}</div>}

								<div className={'titleEnterMail'}>
									Create new password and we will send you further instructions to email
								</div>
								<Button type={'submit'} variant={'contained'} color={'primary'}
								        disabled={
									        !!((!formik.values.password && !formik.values.confirmPassword)
										        || (formik.errors.password || formik.errors.confirmPassword))}>
									create new password
								</Button>
								<div className={'question'}>
									Bad token?
								</div>
								<Link className={'linkTryLoggingIn'} to="/forgot-password-page">
									Forgot password
								</Link>
							</form>
						</Paper>
					</Box>
				</div>
			</Grid>
		</>
	);
};

export default NewPasswordPage;

