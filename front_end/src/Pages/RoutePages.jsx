import React from 'react';
import {Route, Routes} from "react-router-dom"
import LoginPage from '../Components/Login/LoginPage';
import Register from '../Components/Register/Register';
import Books from './Books';
import CreateBook from './CreateBook';

const RoutePages = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/books' element={<Books/>}/>
            <Route path='books/create' element={<CreateBook/>}/>
            <Route path='*' element={<h1>You are not authorize to access this page</h1>}/>
        </Routes>
    );
};

export default RoutePages;