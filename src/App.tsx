import React, {useEffect} from 'react';
import './App.css';
import Main from "./components/pages/Main";
import {useAppDispatch, useAppSelector} from "./store/store";
import {initializeAppTC} from "./reducers/profileReducer";
import {CircularProgress} from "@material-ui/core";

function App() {

    const isInitialized = useAppSelector(state => state.profile.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;