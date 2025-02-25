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
   Reqdoc
=================================== */
const projects_routes_1 = __importDefault(require("./projects/reqdoc/projects/projects.routes"));
const features_routes_1 = __importDefault(require("./projects/reqdoc/features/features.routes"));
const reqs_routes_1 = __importDefault(require("./projects/reqdoc/reqs/reqs.routes"));
const users_routes_1 = __importDefault(require("./projects/reqdoc/users/users.routes"));
const teams_routes_1 = __importDefault(require("./projects/reqdoc/teams/teams.routes"));
const admin_routes_1 = __importDefault(require("./projects/reqdoc/admin/admin.routes"));
router.use('/api/reqdoc/projects', projects_routes_1.default);
router.use('/api/reqdoc/features', features_routes_1.default);
router.use('/api/reqdoc/reqs', reqs_routes_1.default);
router.use('/api/reqdoc/user', users_routes_1.default);
router.use('/api/reqdoc/teams', teams_routes_1.default);
router.use('/api/reqdoc/admin', admin_routes_1.default);
/* ===================================
   Hot Key
=================================== */
const notes_routes_1 = __importDefault(require("./projects/hotkey/notes/notes.routes"));
router.use('/api/hotkey/notes', notes_routes_1.default);
/* ===================================
   Snapplist
=================================== */
const places_routes_1 = __importDefault(require("./projects/snapplist/places/places.routes"));
const neighborhoods_routes_1 = __importDefault(require("./projects/snapplist/neighborhoods/neighborhoods.routes"));
const categories_routes_1 = __importDefault(require("./projects/snapplist/categories/categories.routes"));
const users_routes_2 = __importDefault(require("./projects/snapplist/users/users.routes"));
router.use('/api/snapplist/places', places_routes_1.default);
router.use('/api/snapplist/neighborhoods', neighborhoods_routes_1.default);
router.use('/api/snapplist/categories', categories_routes_1.default);
router.use('/api/snapplist/user', users_routes_2.default);
/* ===================================
   Hot Sauce
=================================== */
const user_routes_1 = __importDefault(require("./projects/hotsauce/users/user.routes"));
const products_routes_1 = __importDefault(require("./projects/hotsauce/products/products.routes"));
const cart_routes_1 = __importDefault(require("./projects/hotsauce/cart/cart.routes"));
router.use('/api/hotsauce/user', user_routes_1.default);
router.use('/api/hotsauce/products', products_routes_1.default);
router.use('/api/hotsauce/cart', cart_routes_1.default);
/* ===================================
   Lesprit
=================================== */
const users_routes_3 = __importDefault(require("./projects/lesprit/users/users.routes"));
const words_routes_1 = __importDefault(require("./projects/lesprit/words/words.routes"));
const words_routes_admin_1 = __importDefault(require("./projects/lesprit/words/words.routes.admin"));
const lists_routes_1 = __importDefault(require("./projects/lesprit/lists/lists.routes"));
const test_routes_1 = __importDefault(require("./projects/lesprit/test/test.routes"));
const verbs_routes_user_1 = __importDefault(require("./projects/lesprit/verbs/verbs.routes.user"));
const verbs_routes_admin_1 = __importDefault(require("./projects/lesprit/verbs/verbs.routes.admin"));
router.use('/api/lesprit/user', users_routes_3.default);
router.use('/api/lesprit/words', words_routes_1.default);
router.use('/api/lesprit/admin/words', words_routes_admin_1.default);
router.use('/api/lesprit/lists', lists_routes_1.default);
router.use('/api/lesprit/test', test_routes_1.default);
router.use('/api/lesprit/user/verbs', verbs_routes_user_1.default);
router.use('/api/lesprit/admin/verbs', verbs_routes_admin_1.default);
exports.default = router;
