import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Loader from '../Components/Loader/Loader';
import { Center } from '@chakra-ui/react';

const Books = () => {

   let [searchParams, setSearchParams] = useSearchParams();
   const [filter,setFilter] = useState('');
   const [books,setBooks] = useState([]);
   const url  = process.env.REACT_APP_Backend_Url;
   const navigate = useNavigate();
   const role = useSelector((store)=>store.authReducer.role)
   const userData = localStorage.getItem('UserData');
   const [loader,setLoader] = useState(false);

   let token  = null;

   if(userData!=null){
    token=JSON.parse(userData).token
    }
   

   const fetchBooks = ()=>{
    setLoader(true);

    fetch(`${url}/books?${filter}=1`,{
        headers:{
            'Authorization':`Bearer ${token}`
        },
    })
     .then((res)=>res.json())
     .then((data)=>{
        setLoader(false);
        if(data?.books){
            setBooks(data.books);
        }
     })
     .catch((error)=>{
        setLoader(false);
        alert("There is somthing wrong");
        console.log(error);
     })
   }


   const handleDelete = (id)=>{
    
    setLoader(true);

    fetch(`${url}/books/delete/${id}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        },
    })
     .then((res)=>res.json())
     .then((data)=>{
        setLoader(false);
        alert(data.Msg);
        fetchBooks();
     })
     .catch((error)=>{
        setLoader(false);
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
        <DIV filter={filter}>
            <h1 style={{textDecoration:"underline"}}>Books Table</h1>
             <div className='filterDiv'>
                <p>Filter:</p>
                <div style={{border:"none",borderRadius:"8px"}} className='new' onClick={()=>{setFilter((prev)=>'new');handleFilter()}}>New</div>
                <div style={{border:"none",borderRadius:"8px"}} className='old' onClick={()=>{setFilter((prev)=>'old');handleFilter()}}>Old</div>
                <div style={{border:"none",borderRadius:"8px"}} className='all' onClick={()=>{setFilter((prev)=>'all');handleFilter()}}>All</div>
             </div>
            <div>
                <div style={{fontSize:'large',fontWeight:"bold",marginBottom:"10px"}}>Total: {books.length}</div>
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
                        {books.length>0?BookData:<td style={{border:"none"}}></td>}
                    </tbody>
                </table>
            </div>
            {loader && <Loader/>}
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
        border-collapse: collapse;  
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow-x: scroll;
        white-space: nowrap;
    }

    h1{
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    th,td{
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


   ${(props) =>
 
        props.filter &&
        `
        .filterDiv .${props.filter} {
            background: linear-gradient(45deg, #2ecc71, #f39c12);
        }
    `}
`