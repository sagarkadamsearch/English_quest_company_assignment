import React from 'react';
import { styled } from 'styled-components';

const Home = () => {


   

    return (
        <DIV>
            <div>
                <table>
                    <thead>
                        <td>Sr. No</td>
                        <td>Book Image</td>
                        <td>Book Name</td>
                        <td>Created at</td>
                        <td>View</td>
                        <td>Edit</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><img src="./book.png" alt="" /></td>
                            <td>My story</td>
                            <td>{Date.now()}</td>
                            <td>Image</td>
                            <td>Edit</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </DIV>
    );
};

export default Home;



const DIV = styled.div`
    border: 1px solid black;
    width: fit-content;
    margin: auto;

    table{
        border: 1px solid black;
        border-collapse: collapse;
    }
    
    table td{
        border: 1px solid black;
        padding: 10px;
    }

    table img{
        width: 60px;
        height: 60px;
    }
`