    import React, { useReducer, useRef, useState } from 'react';
    import { shallowEqual, useDispatch, useSelector } from 'react-redux';
    import styled from 'styled-components'
    import { handleRegisterEmail, handleRegisterName, handleRegisterPassword, handleRegisterRole,handleRegisterReset } from '../../Redux/Register/action';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import Loader from '../Loader/Loader';

    const Register = () => {
        const inputRefs = useRef([]);
        const [loader,setLoader] = useState(false);

        const dispatch = useDispatch();

        const {name,email,password,role} = useSelector((store)=>({
            name:store.registerReducer.name,
            email:store.registerReducer.email,
            password:store.registerReducer.password,
            role:store.registerReducer.role
        }),shallowEqual);

        const handleChange = (e)=>{
        const role = e.target.value;
        dispatch(handleRegisterRole(role));
        }

        const handleName = (e)=>{
            const name = e.target.value;
            dispatch(handleRegisterName(name))
        }

        const handleEmail = (e)=>{
            const email = e.target.value.toLowerCase();
            dispatch(handleRegisterEmail(email))
        }

        const handlePassword = (e)=>{
            const password = e.target.value;
            dispatch(handleRegisterPassword(password));
        }

        const handleReset = ()=>{
            dispatch(handleRegisterReset());
        }

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
         
            const isValidFormat = emailRegex.test(email);
            const hasValidDomain = email.endsWith('.com');
          
            return isValidFormat && hasValidDomain;
          };

        const handleSubmit = (e)=>{
          e.preventDefault();
          const inputs = inputRefs.current
        
          for(let i=0;i<inputs.length;i++){
            const input = inputs[i];

            if (input.classList.contains('invalid') || input.value.trim() === '') {
                inputRefs.current[i].classList.add('sagar');
            }
            else{
                inputRefs.current[i].classList.remove('sagar');
            }
          }

          if(!email || !name || !password || !role){
            return alert("Please fill all fields");
          }
          
          if(!isValidEmail(email)){
            return alert("Please enter a valid email address!");
          }
          
          const obj = {
            name,
            email,
            password,
            role
          }

          const url  = process.env.REACT_APP_Backend_Url;

          setLoader(true);

          axios.post(`${url}/register`,obj)
          .then((res)=>{
            setLoader(false); 
            alert(res.data.Msg);           
            handleReset()
          })
          .catch((error)=>{
            setLoader(false);
            alert('An error occurred');
            console.log(error)
           });
          
        }

        return (
            <LoginSignupDiv className='loginSignupDiv'>
                <LoginForm className='loginForm'>
                    <p>Register Now!</p>
                    <form className='form' action="">
                        <FormDiv>
                            <label htmlFor="name">Name:</label>        
                            <input value={name} ref={(el) => (inputRefs.current[0] = el)}  onChange={handleName} id='name' type="text" />
                        </FormDiv>
                        <FormDiv>
                            <label htmlFor="email">Email:</label>        
                            <input value={email} required ref={(el) => (inputRefs.current[1] = el)}  onChange={handleEmail} id='email' type="email" />
                        </FormDiv>
                        <FormDiv>
                            <label htmlFor="password">Password:</label>        
                            <input value={password}  ref={(el) => (inputRefs.current[2] = el)}  onChange={handlePassword} id='password' type="text" />
                        </FormDiv>
                        <CheckBoxDiv>
                            <label >Role:</label>  
                            <div  className='checkboxContainer' onChange={handleChange}>
                            <div className='checkbox'>      
                                <input checked={role==='VIEW_ALL'} value='VIEW_ALL' name='role' type="radio"/>
                                <p>User</p>
                            </div>
                            <div className='checkbox'>      
                                <input checked={role==='CREATOR'} value='CREATOR' name='role' type="radio" />
                                <p>Creator</p>
                            </div>
                            </div>   
                        </CheckBoxDiv>
                        <button type='submit' onClick={handleSubmit}>Create account</button>
                    </form>
                    <div className='register'>
                    <p>Have an account?<Link to='/login'><span>Login</span></Link></p>
                    </div>
                    <div className='connections'>
                        <img src='./images/Facebook.svg' alt="" />
                        <img src='./images/Telegram.svg' alt="" />
                        <img src='./images/WhatsApp.svg' alt="" />
                    </div>
                </LoginForm>
                
                <div className='sideDiv'>
                    <img src="https://nubot.ai/wp-content/uploads/2022/11/Imagen-4-Laptop-Deployment.png" alt="" />
                </div>
                {loader && <Loader/>}
            </LoginSignupDiv>
        );
    };

    export default Register;


    const LoginSignupDiv = styled.div`
    background-color: #EBEFFF;
    min-height: 100vh;
    display: flex;
    max-width: 1600px;
    margin: auto;

    .sideDiv{
        width: 30%;
        /* border: 1px solid orange; */
        background-color: #AFB3FF;
        display: flex;
        align-items: center;
    } 

    @media all and (max-width:1000px){
    
        flex-direction: column-reverse;
        gap: 10px;
        .sideDiv{
        height: 250px;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        }
    }

    .sideDiv img{
        max-width: 400px;
        min-width: 400px;
        width: 100%;
        margin-left: -50%;
    }

    @media all and (max-width:1000px){
    
        .sideDiv img{
        max-width: 400px;
        min-width: 400px;
        width: 100%;
        margin-left: 0%;
        margin-bottom: -20%;
    }
    }


    .register span{
        margin-left: 5px;
        font-weight:bold;
    }

    .connections{
        max-width: 200px;
        width: 25%;
        /* border: 1px solid black; */
        margin: auto;
        display: flex;
        justify-content:space-around;
        margin-bottom: 20px;

    }
    `

    const LoginForm = styled.div`
    
        /* border: 1px solid black; */
        max-width: fit-content;
        margin: auto;

        @media all and (max-width:1000px){
        margin-top: 170px;
        
        }
    
        .form{
            display: flex;
            flex-direction: column;
            padding: 30px;
            gap: 10px;
        }

        &>p:nth-child(1){
            font-size: x-large;
            font-weight: 600;
        }

        button{
            background-color: #656ED3;
            border: none;
            padding: 12px 0px;
            border-radius: 100px;
            margin-top: 20px;
            color: white;
            font-size: 15px;
            font-weight: 500;
        }

    button:hover{
        background-color: #747de1 ;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
        cursor: pointer;
    }
    `

    
const FormDiv = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 400px;
gap: 12px;

& input{
    padding: 10px;
    width: 100%;
    border: 1px solid #656ED3;
    border-radius: 100px;
    background-color: transparent;
}

& input:focus{
    outline:1px solid #5860ba;
}

& input[type='checkbox']{
    width: 50px;
    height: 50px;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
}

input.sagar{
    border: 1px solid red;
    outline-color: red;
}
`



    const CheckBoxDiv = styled.div`
        
        display: flex;
        gap: 10px;
        align-items: center;
        
        /* border: 1px solid black; */

        .checkbox{
            display: flex;
        }
        .checkbox input{
            cursor: pointer;
        }
        .checkbox p{
            cursor: default;
        }
        .checkboxContainer{
            display: flex;
            gap: 15px;
        }
    `