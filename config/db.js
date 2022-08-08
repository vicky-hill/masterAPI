const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;

const connectDB = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let db = mongoose.connection.db;

    // Rename the `test` collection to `foobar`
    // return db.collection('lesprit_users').rename('test_users');
 
    console.log(`MongoDB connected ...`);
};

module.exports = connectDB;