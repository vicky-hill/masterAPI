const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());

const routes = require('./routes');

// Enable cors
app.use(cors());

// Mount Routes
app.use('/', routes);

// Set react as static folder
app.use(express.static('client/build'));
app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
}); 


app.listen(PORT, console.log('Server running on ' + PORT));