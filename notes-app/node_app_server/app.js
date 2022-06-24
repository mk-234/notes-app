const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({origin: 'http://localhost'}));
const router = require('./routes/routes');
const mongoose = require('mongoose');

app.use(express.json());
app.use(router);

const port = 3000;


app.listen(port, () => {
    console.log('Listening to port:', port);
});

//insert the connection string of your mongodb server here
//it is necessary to have your own online database for the use of this node.js server
mongoose.connect('insert-your-connection-string', () =>{
    console.log('DB connected');
});