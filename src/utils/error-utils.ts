import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../reducers/profileReducer";
import {FormikErrorType} from "../components/pages/login/LoginPage";

export const handleServerNetworkError = (dispatch:Dispatch, message: string)=>{
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const validateFormErrors = (values: any)=>{
    const errors: FormikErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password should be 8 characters or more ';
    }
    return errors;
}

export const validateNewPassFormErrors = (values: any)=>{
    const errors: FormikErrorType = {};
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password should be 8 characters or more ';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match. Try again';
    }
    return errors;
}

export const validateNewPassEmailFormErrors = (values: any)=>{
    const errors: FormikErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

