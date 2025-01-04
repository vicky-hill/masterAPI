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
exports.protect = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const users_model_1 = __importDefault(require("../users/users.model"));
// Protect all routes 
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get token in the header
    const token = req.header('x-auth-token');
    // Check if no token
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }
    // Verify token
    try {
        const decoded = (0, jwt_decode_1.default)(token);
        const user = yield users_model_1.default.findOne({ firebaseId: decoded.user_id });
        if (!user) {
            res.status(401).json({ msg: 'No user found' });
            return;
        }
        req.user = user;
        req.user.userId = user._id;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
});
exports.protect = protect;
