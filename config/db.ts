import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const uri: string | undefined = process.env.DB_URI;

if (!uri) {
    throw new Error("DB_URI is not defined in the environment variables");
}

const connectDB = async () => {
    await mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });

    let db = mongoose.connection.db;

    // Rename the `test` collection to `foobar`
    // return db.collection('lesprit_users').rename('test_users');

    console.log(`MongoDB connected ...`);
};

export default connectDB;