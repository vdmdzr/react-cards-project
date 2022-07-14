import React from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {loginTC} from "../../../reducers/loginReducer";
import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {PATH} from "../Pages";
import style from '../../common/styles/FormStyles.module.css'
import ErrorSnackbar from "../../common/pages/ErrorSnackBar";
import LinearProgress from "@mui/material/LinearProgress";
import {validateFormErrors} from "../../../utils/error-utils";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}

const LoginPage = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const status = useAppSelector(state => state.profile.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            return validateFormErrors(values)
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: true,
    });


    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE_PAGE}/>
    }


    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>
                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Sign In</div>
                            <form onSubmit={formik.handleSubmit}>


                                    <div className={style.field}>

                                    <FormGroup>
                                        <FormControl>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
                                        </FormControl>
                                        {formik.touched.email
                                            && formik.errors.email
                                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                                        <FormControl variant="standard">
                                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                type={valuesPassword.showPassword ? 'password' : 'text'}
                                                name="password"
                                                placeholder={'Password'}
                                                onBlur={() => formik.setFieldTouched('password', true) }
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
                                            <div style={{color: 'red'}}>{formik.errors.password}</div>}



                                        <FormControlLabel label={'Remember me'} control={<Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />}/>

                                        <div className={style.forgotPassword}>
                                            <Link to={'/forgot-password-page'}>Forgot Password?</Link>

                                        </div>
                                        <Button type={'submit'} variant={'contained'}
                                                color={'primary'}
                                                disabled={
                                                    !!((!formik.values.password && !formik.values.email)
                                                        || (formik.errors.password || formik.errors.email))}>
                                            Login
                                        </Button>
                                        <div className={style.signUpText}>Don't have an account</div>
                                        <div className={style.signUpLinkText}>
                                            <Link to={'/register-page'}>Sign Up</Link>
                                        </div>

                                    </FormGroup>
                                    </div>


                            </form>
                        </div>
                        <ErrorSnackbar/>
                    </Grid>
                </div>
            </Grid>

        </div>
    )
}

export default LoginPage