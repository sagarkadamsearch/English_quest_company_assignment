import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const CreateBook = () => {
    
    const [bookName,setBookName] = useState('');
    const [description,setDescription] = useState('');

    const navigate = useNavigate();
    let userData = localStorage.getItem('UserData');
    let token = '';
    let role = '';

    if(userData!=null){
     userData = JSON.parse(userData);
     token = userData.token;
     role = userData.role;
    }

   useEffect(()=>{
    if(!token){
        return navigate('/login')
    }

    if(role!='CREATOR'){
        return navigate('*')
      }
   },[token])

  const handleSubmit = ()=>{
    if(bookName=='' || description==''){
        return;
     }

    const obj = {
        bookName,
        description
    }

    const url  = process.env.REACT_APP_Backend_Url;

    axios.post(`${url}/books/create/submit`,obj)
    .then((res)=>alert(res.data.Msg))
    .catch((error)=>{
        alert("There is an error while create a book")
        console.log(error)
    })
  }

    return (
        <DIV>
          <label htmlFor="">Book name:</label>
          <input onChange={(e)=>setBookName(e.target.value)} type="text" />
          <label htmlFor="">Description:</label>
          <textarea onChange={(e)=>setDescription(e.target.value)} type="text" />
          <button onClick={handleSubmit}>Create</button>
        </DIV>
    );
};

export default CreateBook;


const DIV = styled.div`
   width: 400px;
   border: 1px solid black;
   margin: auto;
   margin-top: 100px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 20px;

   input,textarea{
    width: 100%;
    border: none;
    padding:10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   }

   button{
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: lightgreen;
    border: none;
   }

   button:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   }
   
`