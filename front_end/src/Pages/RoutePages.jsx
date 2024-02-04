import React from 'react';
import {Route, Routes} from "react-router-dom"
import LoginPage from '../Components/Login/LoginPage';
import Register from '../Components/Register/Register';
import Home from './Home';

const RoutePages = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
    );
};

export default RoutePages;