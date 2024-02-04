import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

const Books = () => {

   let [searchParams, setSearchParams] = useSearchParams();
   const [filter,setFilter] = useState('');
   const [books,setBooks] = useState([]);
   const url  = process.env.REACT_APP_Backend_Url;
   const navigate = useNavigate();
   const role = useSelector((store)=>store.authReducer.role)
   const userData = localStorage.getItem('UserData');

   let token  = null;

   if(userData!=null){
    token=JSON.parse(userData).token
    }
   
   
 


   const fetchBooks = ()=>{
    fetch(`${url}/books?${filter}=1`,{
        headers:{
            'Authorization':`Bearer ${token}`
        },
    })
     .then((res)=>res.json())
     .then((data)=>{
        if(data?.books){
            setBooks(data.books);
        }
     })
     .catch((error)=>{
        alert("There is somthing wrong");
        console.log(error);
     })
   }


   const handleDelete = (id)=>{
    
    fetch(`${url}/books/delete/${id}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        },
    })
     .then((res)=>res.json())
     .then((data)=>{
        alert(data.Msg);
        fetchBooks();
     })
     .catch((error)=>{
        alert("There is somthing wrong");
        console.log(error);
     })
    }
    
   useEffect(()=>{
   
    if(!token){
       return navigate('/login')
    }

    fetchBooks();
    const obj = {}

    if(filter){
        obj[filter]=1;
    }

    setSearchParams(obj)
   },[filter]);

   

    const BookData = books.map((e,index)=>(
    <tr key={index}>
    <td>{index+1}</td>
    <td><img src="./book.png" alt="" /></td>
    <td>{e.bookName}</td>
    <td>{new Date(e.created_at).toLocaleString()}</td>
    <td>{e.author}</td>
    <td style={{color:"green",cursor:'pointer'}}>view</td>
    {role=="CREATOR" && <td style={{color:"red",cursor:'pointer'}} onClick={()=>handleDelete(e._id)}>Delete</td> }
    </tr>
    ))


    const handleFilter = ()=>{
      
    }

    return (
        <DIV>
            <h1>Books Table</h1>
             <div className='filterDiv'>
                <p>Filter:</p>
                <div onClick={()=>{setFilter((prev)=>'new');handleFilter()}}>New</div>
                <div onClick={()=>{setFilter((prev)=>'old');handleFilter()}}>Old</div>
             </div>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Sr. No</th>
                        <th>Book Image</th>
                        <th>Book Name</th>
                        <th>Created at</th>
                        <th>Created By</th>
                        <th>View</th>
                       {role=="CREATOR" && <th>Delete</th> }
                       </tr>
                    </thead>
                    <tbody>
                        {books && BookData}
                    </tbody>
                </table>

            </div>
        </DIV>
    );
};

export default Books;



const DIV = styled.div`
    /* border: 1px solid black; */
    width: fit-content;
    margin: auto;
    margin-top: 100px;
    padding-bottom: 100px;
    table{
        border: 1px solid black;
        border-collapse: collapse;
    }
    
    table td,th{
        border: 1px solid black;
        padding: 10px;
    }

    table img{
        width: 60px;
        height: 60px;
    }

   tr:hover{
    background-color: lightgray;
   }

   .filterDiv{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
   }

   .filterDiv div{
    width: 60px;
    height: 40px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: linear-gradient(45deg, #3498db, #e74c3c);
    cursor: pointer;
   }

   .filterDiv div:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   }

   .filterDiv p{
    font-size: large;
   }
`