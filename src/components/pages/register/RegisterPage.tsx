import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {Link, Navigate} from "react-router-dom";
import style from '../../common/styles/FormStyles.module.css'
import {registerTC} from "../../../reducers/registerReducer";
import {PATH} from "../Pages";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorSnackbar from "../../common/pages/ErrorSnackBar";
import {validateFormErrors} from "../../../utils/error-utils";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type StatePassword = {
    password: string;
    showPassword: boolean;
}

const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const success = useAppSelector(state => state.register.success)
    const status = useAppSelector(state => state.profile.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            return validateFormErrors(values)
        },
        onSubmit: values => {
            dispatch(registerTC(values))
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

    if (success) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }


    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>

                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Register</div>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl>
                                    <div className={style.field}>

                                    <FormGroup>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
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

                                        <div className={style.button}>
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.password && !formik.values.email)
                                                            || (formik.errors.password || formik.errors.email))}>
                                                Register
                                            </Button>
                                        </div>
                                        <div className={style.signUpText}>Already have an account</div>
                                        <div className={style.signUpLinkText}>
                                            <Link to={PATH.LOGIN_PAGE}>Sign In</Link>
                                        </div>

                                    </FormGroup>
                                    </div>
                                </FormControl>
                            </form>
                        </div>
                        <ErrorSnackbar/>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}


export default RegisterPage
