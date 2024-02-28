import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useSearchParams,useLocation } from 'react-router-dom';

const MyPagination = ({pages}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const PageParam = searchParams.get('page');  
  const [currentPage, setCurrentPage] = useState(Number(PageParam) || 1);

 

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Do something with the new page number, like fetching data for that page
    let params = new URLSearchParams(searchParams.toString());
    params.set('page',newPage.toString())
    setSearchParams(params);
  };


 
useEffect(()=>{
    let page = searchParams.get('page');
    setCurrentPage(Number(page))
},[location.search])

  return (
    <Pagination
      count={pages}  // Total number of pages
      variant="outlined"  // Outlined pagination style
      color="primary"  // Primary color
      page={currentPage}  // Current page
      onChange={handlePageChange}  // Event handler for page change
    />
  );
};

export default MyPagination;
