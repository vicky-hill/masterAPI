"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Check backend health
router.get('/health-check', (req, res) => { res.send('Great Health'); });
/* ===================================
   Hot Key
=================================== */
const notes_routes_1 = __importDefault(require("./projects/hotkey/notes/notes.routes"));
router.use('/api/hotkey/notes', notes_routes_1.default);
exports.default = router;
