"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = __importDefault(require("./middleware/errors"));
// import { addCascadeConstraint } from './projects/sandbox/posts/posts.functions'
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 4000;
(0, db_1.default)();
// addCascadeConstraint();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use('/', routes_1.default);
// error handler middleware.. catches all errors thrown
app.use((err, req, res, next) => {
    var _a;
    console.log(err);
    err.controller = (_a = err.ctrl) === null || _a === void 0 ? void 0 : _a.name;
    (0, errors_1.default)(err, req, res, next);
});
app.listen(PORT, () => console.log('Server running on ' + PORT));
exports.default = app;
