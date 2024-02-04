const express = require('express');
const { connection } = require('./db');
const app = express();
const cors= require('cors');
const { UserRoute } = require('./Routes/user.route');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/',UserRoute);




app.listen(8080,async()=>{
    try {
        await connection;
        console.log('Server is running at port 8080');
        console.log('Mongo Data base connected');
    } catch (error) {
        console.log("Error",error);
    }
})
