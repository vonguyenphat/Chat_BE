require('dotenv').config();
const express = require('express');
const app = express();
const configCors = require('./config/config.cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const appRouter = require('./router/app.router');



const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;
const PORT = process.env.PORT;


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
configCors(app);
appRouter(app);
mongoose
    .connect(MONGODB_CONNECTION_URI)
    .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
