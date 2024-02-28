import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams,useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Loader from '../Components/Loader/Loader';
import MyPagination from '../Components/Pagination/pagination';

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('');
  const [books, setBooks] = useState([]);
  const url = process.env.REACT_APP_Backend_Url;
  const navigate = useNavigate();
  const role = useSelector((store) => store.authReducer.role);
  const userData = localStorage.getItem('UserData');
  const [loader, setLoader] = useState(false);
  const page = searchParams.get('page');
  const location = useLocation();
  const [total,setTotalCount] = useState(0);
  const [pages,setPages] = useState(1);

  let token = null;

  if (userData != null) {
    token = JSON.parse(userData).token;
  }

  const fetchBooks = () => {
    setLoader(true);

    fetch(`${url}/books?${filter}=1&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        if (data?.books) {
          setBooks(data.books);
          setTotalCount(data.total); 
          setPages(data.pages);
        }
      })
      .catch((error) => {
        setLoader(false);
        alert('There is something wrong');
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setLoader(true);

    fetch(`${url}/books/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        alert(data.Msg);
        fetchBooks();
      })
      .catch((error) => {
        setLoader(false);
        alert('There is something wrong');
        console.log(error);
      });
  };

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }

    fetchBooks();
    
    let params = new URLSearchParams(searchParams.toString());

    if (filter) {
        params.set('filter',`${filter}`);
        params.set('page',1);
    }
    setSearchParams(params);
  }, [filter]);


  useEffect(()=>{
    fetchBooks();
  },[location.search])

  useEffect(()=>{
    let page = Number(searchParams.get('page'));
    const maxPage = Math.ceil(total/5) || 1;
    if(page>maxPage){
        setSearchParams({...searchParams,page:maxPage})
    } 
  },[total])

  const BookData = books.map((e, index) => (
    <tr key={index}>
      <td>
        <img src="./book.png" alt="" />
      </td>
      <td>{e.bookName}</td>
      <td>{new Date(e.created_at).toLocaleString()}</td>
      <td>{e.author}</td>
      <td style={{ color: 'green', cursor: 'pointer' }}>view</td>
      {role === 'CREATOR' && (
        <td style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(e._id)}>
          Delete
        </td>
      )}
    </tr>
  ));

  return (
    <DIV filter={filter}>
      <h1 style={{ textDecoration: 'underline' }}>Books Table</h1>
      <div className="filterDiv">
        <p>Filter:</p>
        <div
          style={{ border: 'none', borderRadius: '8px' }}
          className="new"
          onClick={() => {
            setFilter((prev) => 'new');
          }}
        >
          New
        </div>
        <div
          style={{ border: 'none', borderRadius: '8px' }}
          className="old"
          onClick={() => {
            setFilter((prev) => 'old');    
          }}
        >
          Old
        </div>
        <div
          style={{ border: 'none', borderRadius: '8px' }}
          className="all"
          onClick={() => {
            setFilter((prev) => 'all');   
          }}
        >
          All
        </div>
      </div>
      
      <div className="table-wrapper">
      <div style={{fontSize:'large',fontWeight:"bold",marginBottom:"10px"}}>Total: {total}</div>
      <div><MyPagination  pages={pages||1}/></div>
        <table>
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Created at</th>
              <th>Created By</th>
              <th>View</th>
              {role === 'CREATOR' && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>{books.length > 0 ? BookData : ""}</tbody>
        </table>
        <div style={{marginBottom:'20px'}}><MyPagination  pages={pages||1}/></div>
      </div>
      {loader && <Loader />}
    </DIV>
  );
};

export default Books;

const DIV = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 50px;
  padding-bottom: 100px;
  max-width: 1440px;

  .table-wrapper {
    border: 1.2px solid black;
    border-radius: 20px;
    overflow: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  table {
    margin: auto;
    width: 95%;
    margin-bottom: 30px;
    border-collapse: collapse;
    white-space: pre-wrap;
    word-wrap: break-word;
    table-layout: auto;
    overflow-x: scroll;
  }
  h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  th,
  td {
    border: 1px solid black;
    padding: 10px;
    white-space: pre-wrap;  
    word-wrap: break-word;
    max-width: 100px;
  }

  th{
    background-color: #e7fafa;
  }

  table img {
    margin: auto;
    height: 60px;
  }

  tr:hover {
    background-color: #eaf1f1;
  }

  .filterDiv {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .filterDiv div {
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

  .filterDiv div:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .filterDiv p {
    font-size: large;
  }

  @media (max-width: 600px) {
    
    th,td {
      font-size: 12px;
      padding: 6px;
    }

    table img {
    margin: auto;
    height: 40px;
  }
  }

  ${(props) =>
    props.filter &&
    `
 .filterDiv .${props.filter} {
     background: linear-gradient(45deg, #2ecc71, #f39c12);
 }
`}
`;
