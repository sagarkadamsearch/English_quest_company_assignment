import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset_Token_And_Role, set_Token_AND_Role } from '../../Redux/Auth/action';

const Navbar = () => {
    const dispatch = useDispatch();
    const data1 = localStorage.getItem('UserData');
    const token = useSelector((store)=>store.authReducer.token);
    const role = useSelector((store)=>store.authReducer.role);
    const navigate = useNavigate();

     useEffect(()=>{
        if(data1){
            dispatch(set_Token_AND_Role(JSON.parse(data1)));
        } 
     },[])

   
     const handleLogout = ()=>{
       dispatch(reset_Token_And_Role());
       localStorage.removeItem('UserData');
       return navigate('/login')
    }

    return (
        <NAVBAR>
            <Link className='linkStyle' to="/books"><p>Books</p></Link>
            {role=="CREATOR" && <Link className='linkStyle' to="books/create"><p>Create Book</p></Link>}
            <div className='buttonDiv'>
            {!token && <Link className='linkStyle' to="/login"> <button className='login'>Login</button></Link>}
            {token && <button onClick={handleLogout} className='logout'>Logout</button>}
            {!token && <Link className='linkStyle' to="/register"><button className='register'> Register</button></Link>}
            </div>
        </NAVBAR>
    );
};

export default Navbar;


const NAVBAR = styled.div`
   background-color: #9FA9D3;
   padding-top : 10px;
   padding-bottom: 10px;
   color: #fff;
   display: flex;
   gap: 20px;
   justify-content: center;
   align-items: center;

    button{
        width: 100px;
        border: none;
        border-radius: 30px;
        padding: 10px;
        cursor: pointer;
    }

    .login{
        background-color: #3498db;
        padding: 10px;
    }
   
    .login:hover{
        background-color: #5fa4d1;
    }
    .register{
        background-color: #2ecc71;
    }
    .register:hover{
        background-color: #62cb8e;
    }
    .buttonDiv{
        display: flex;
        gap: 20px;
    }
  
    p{
        cursor: pointer;
    }

    p:hover{
        color: black;
    }

    .linkStyle{
        text-decoration: none;
        color:#fff;
    }

    .logout{
        background-color: lightcoral;
        color:#fff
    }

    .logout:hover{
        background-color: #e69e9e;
     color: black;
    }

`