import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Books = () => {

   const navigate = useNavigate();
   const role = useSelector((store)=>store.authReducer.role)
   const userData = localStorage.getItem('UserData')
   let token  = '';
   if(userData!=null){
      token=JSON.parse(userData).token
   }

   useEffect(()=>{
    if(!token){
        return navigate('/login')
    }
   },[token])

    return (
        <DIV>
            <h1>Books Table</h1>
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
                       {role=="CREATOR" && <th>Edit</th> }
                       {role=="CREATOR" && <th>Delete</th> }
                       </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><img src="./book.png" alt="" /></td>
                            <td>My story</td>
                            <td>{new Date().toLocaleString()}</td>
                            <td>Sagar Kadam</td>
                            <td style={{color:"green",cursor:'pointer'}}>view</td>
                            {role=="CREATOR" && <td style={{color:"darkblue",cursor:'pointer'}}>Edit</td> }
                            {role=="CREATOR" && <td style={{color:"red",cursor:'pointer'}}>Delete</td> }
                        </tr>
                    </tbody>
                </table>

            </div>
        </DIV>
    );
};

export default Books;



const DIV = styled.div`
    border: 1px solid black;
    width: fit-content;
    margin: auto;
    margin-top: 100px;
    
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
`