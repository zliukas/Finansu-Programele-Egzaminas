
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const {errorHandler} = require("./middleware/erorrHandler");
const morgan = require('morgan');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express()

dotenv.config({ path: './config/config.env' });

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use ('/api/users', require('./routes/userRoutes'));
app.use('/api/v1/transactions', require('./routes/transactions'));

app.use(errorHandler);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

