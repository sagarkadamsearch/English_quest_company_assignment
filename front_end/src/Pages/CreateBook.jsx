import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Loader from '../Components/Loader/Loader';

const CreateBook = () => {
    
    const [bookName,setBookName] = useState('');
    const [description,setDescription] = useState('');
    const [loader,setLoader] = useState(false);

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
        return alert('Please fill all fields!');
     }

    const obj = {
        bookName,
        description
    }

    setLoader(true);
    const url  = process.env.REACT_APP_Backend_Url;
    fetch(`${url}/books/create/submit`,{
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"Application/json",
            'Authorization':`Bearer ${token}`
        },
        method:"POST"
    })
     .then((res)=>res.json())
     .then((data)=>{
        setLoader(false);
        alert(data.Msg);
        setBookName('');
        setDescription('');
     })
     .catch((error)=>{
        setLoader(false);
        alert("There is somthing wrong");
        console.log(error);
     })
  }

    return (
        <DIV>
          <label htmlFor="">Book name:</label>
          <input onChange={(e)=>setBookName(e.target.value)} type="text" />
          <label htmlFor="">Description:</label>
          <textarea onChange={(e)=>setDescription(e.target.value)} type="text" />
          <button onClick={handleSubmit}>Create</button>
          {loader && <Loader/>}
        </DIV>
    );
};

export default CreateBook;


const DIV = styled.div`
   width: 400px;
   /* border: 1px solid black; */
   margin: auto;
   margin-top: 100px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 20px;
   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   padding-top: 50px;
   padding-bottom: 50px;

   input,textarea{
    min-width: 100%;
    max-width: 100%;
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