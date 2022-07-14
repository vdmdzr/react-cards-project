import React from 'react';
import Pages from "./Pages";
import {HashRouter} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <HashRouter>
                <Pages/>
            </HashRouter>
        </div>
    );
};

export default Main;