import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset_Token_And_Role, set_Token_AND_Role } from '../../Redux/Auth/action';
import Loader from '../Loader/Loader';
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
    const dispatch = useDispatch();
    const data1 = localStorage.getItem('UserData');
    const token = useSelector((store)=>store.authReducer.token);
    const role = useSelector((store)=>store.authReducer.role);
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);
    const [profile,setProfile] = useState(false);

     useEffect(()=>{
        if(data1){
            dispatch(set_Token_AND_Role(JSON.parse(data1)));
        } 
     },[])

   
     const handleLogout = ()=>{
       setLoader(true); 
       dispatch(reset_Token_And_Role());
       localStorage.removeItem('UserData');
       setLoader(false);
       return navigate('/login')
    }

    return (
        <NAVBAR>
            {loader && <Loader/>}
            <span>
                English Quest
            </span>
            <Link className='linkStyle' to="/books">
                <p>Books</p>
            </Link>

            {role=="CREATOR" && <Link className='linkStyle' to="books/create"><p>Create Book</p></Link>}

            <div className='buttonDiv'>
               {!token && 
               <Link className='linkStyle' to="/login"> 
                    <button className='login'>
                        Login
                    </button>
                </Link>
                }

               {token &&
                  <button onClick={handleLogout} className='logout'>
                    Logout
                  </button>}

               {!token && 
                  <Link className='linkStyle' to="/register">
                    <button className='register'>
                       Register
                    </button>
                  </Link>
                }
            </div>

            {token && 
              <div className='profile'>
                <CgProfile size={35} onClick={()=>setProfile(!profile)} cursor='pointer' />
              </div>
            }
        </NAVBAR>
    );
};

export default Navbar;


const NAVBAR = styled.div`
   background-color: #acb6da;
   padding-top : 3px;
   padding-bottom: 3px;
   color: #fff;
   display: flex;
   gap: 20px;
   justify-content: center;
   align-items: center;
   position: relative;

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

   span{
     font-size: xx-large;
      position: absolute;
      font-weight: 900;
      left: 30px;
   }

   @media all and (max-width: 1000px){
    justify-content: flex-end;
    span{
        font-size: 4vw;
    }
   }

   .profile{

   }
`