"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = __importDefault(require("./middleware/errors"));
// migrateReqdoc();
// migrateFalseIdol();
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 4000;
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigins = ((_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(',')) || (isDevelopment ? ['http://localhost:3000'] : []);
app.use((0, cors_1.default)({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
}));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [process.env.SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
    // For cross-origin requests (localhost:3000 -> localhost:4000), we need 'none'
    // Note: Browsers require secure: true with sameSite: 'none', but for localhost
    // some browsers may accept secure: false. If it doesn't work, use HTTPS or Next.js rewrites.
    sameSite: 'none',
    secure: false, // Set to true in production (requires HTTPS)
    httpOnly: true
}));
app.use((req, res, next) => {
    if (req.session) {
        req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    }
    next();
});
app.use('/', routes_1.default);
app.use((err, req, res, next) => {
    var _a;
    console.log(err);
    err.controller = (_a = err.ctrl) === null || _a === void 0 ? void 0 : _a.name;
    (0, errors_1.default)(err, req, res, next);
});
app.listen(PORT, () => console.log('Server running on ' + PORT));
exports.default = app;
