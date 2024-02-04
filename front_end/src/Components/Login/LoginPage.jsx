import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <LoginSignupDiv className='loginSignupDiv'>
            <LoginForm className='loginForm'>
                <p>Welcome Back!</p>
                <form className='form' action="">
                    <FormDiv>
                        <label htmlFor="email">Email:</label>        
                        <input required id='email' name='email' type="text" placeholder='' />
                    </FormDiv>
                    <FormDiv>
                        <label htmlFor="email">Password:</label>        
                        <input required id='email' name='email' type="text" placeholder='' />
                    </FormDiv>
                    <button type='submit'>Login</button>
                </form>
                <div className='register'>
                   <p>Dont have an account?<Link to="/register"><span>Register</span></Link></p>
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
        </LoginSignupDiv>
    );
};

export default LoginPage;


const LoginSignupDiv = styled.div`
 background-color: #EBEFFF;
 height: 100vh;
 display: flex;
 align-items: center;
 max-width: 1600px;
 margin: auto;

.sideDiv{
  
    height: 100%;
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
        margin-top: 30px;
        color: white;
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
`