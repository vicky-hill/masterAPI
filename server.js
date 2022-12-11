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
// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// }); 

// error handler middleware.. catches all errors thrown
app.use((err, req, res, next) => {
        if (!err.statusCode) err.statusCode = 500; // eslint-disable-line no-param-reassign
        // eslint-disable-next-line no-param-reassign
        if (err.errors && err.errors.length > 0 && err.errors[0] && err.errors[0].messages) err.message = err.errors[0].messages[0];

        res
                .status(err.statusCode)
                .send({ status: err.statusCode, error: err.message });
});


app.listen(PORT, console.log('Server running on ' + PORT));