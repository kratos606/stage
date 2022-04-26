const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_SECRET_KEY,(err) => {
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log('Connected to Mongoose')
    }
})

const plan = require('./routers/plan');
app.use('/plan',plan);
const auth = require('./routers/auth');
app.use('/auth',auth);
const user = require('./routers/user');
app.use('/user',user);
const history = require('./routers/history');
app.use('/history',history);

app.listen(process.env.PORT,() => {
    console.log('Listening on port ' + process.env.PORT)
})