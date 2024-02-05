import React from 'react';
import { Spinner,Stack } from '@chakra-ui/react'
import { styled } from 'styled-components';

const Loader = () => {
    return (
        <DIV>
       <Stack direction='row' spacing={4}>
         <Spinner className='loader' width={60} height={60}  thickness='5px' emptyColor='gray' color='skyBlue'  speed='0.65s'/>
       </Stack>
        </DIV>
    );
};

export default Loader;


const DIV = styled.div`
      position: fixed;
      top: 50%;
      left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: blur(5px);
  
    .loader{
      position: fixed;
      top: 50%;
      left: 50%;
    }
     
`