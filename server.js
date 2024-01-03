const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()
require('./utils/jsdocs')
require('./projects/reqdoc/utils/jsdoc')
require('./projects/squirreled/utils/jsdoc')
require('./projects/tiki/utils/jsdoc')
const onError = require('./middleware/errors')

const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(logger("dev"));

const routes = require('./routes');

// Enable cors
app.use(cors());

// Mount Routes
app.use('/', routes);


// error handler middleware.. catches all errors thrown
app.use((err, req, res, next) => {
        onError(err, req, res, next);
});

app.listen(PORT, console.log('Server running on ' + PORT));

module.exports = app;