const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 7200;
const connectDB = require('./config/db');

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api',require('./Routes/signup'));
app.use('/api',require('./Routes/login'));
app.use('/api',require('./Routes/food'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/foodCategory'));



app.listen(PORT,()=>{
    console.log(`Server is connected at ${PORT}`);
})

