// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

// config
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
};

// controllers
const productController = require('./controllers/products');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cors(corsOptions));

// database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log(`connected to Mongo`);
});
mongoose.connection.on('error', (err) =>
    console.log(err.message + ' is Mongod not running?'),
);
mongoose.connection.on('connected', () => console.log('mongo connected: '));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

// import
app.use('/api/products', productController);

// routes
app.get('/', (req, res) => {
    res.send('home');
});

// listen
app.listen(PORT, () => {
    console.log('listening');
});
