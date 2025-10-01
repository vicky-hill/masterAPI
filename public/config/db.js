"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set strictQuery to true to suppress the deprecation warning
mongoose_1.default.set('strictQuery', true);
const uri = process.env.DB_FLUENT_URI;
if (!uri) {
    throw new Error("DB_FLUENT_URI is not defined in the environment variables");
}
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    });
    let db = mongoose_1.default.connection.db;
    // Rename the `test` collection to `foobar`
    // return db.collection('lesprit_users').rename('test_users');
    console.log(`MongoDB connected ...`);
});
exports.default = connectDB;
