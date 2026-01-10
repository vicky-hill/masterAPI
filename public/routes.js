"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./projects/sandbox/utils/models");
const router = express_1.default.Router();
// Check backend health
router.get('/health-check', (req, res) => { res.send('Great Health'); });
/* ===================================
   Reqdoc
=================================== */
const users_routes_1 = __importDefault(require("./projects/reqdoc-sql/users/users.routes"));
const teams_routes_1 = __importDefault(require("./projects/reqdoc-sql/teams/teams.routes"));
const features_routes_1 = __importDefault(require("./projects/reqdoc-sql/features/features.routes"));
const reqs_routes_1 = __importDefault(require("./projects/reqdoc-sql/reqs/reqs.routes"));
router.use('/api/reqdoc-sql/users', users_routes_1.default);
router.use('/api/reqdoc-sql/teams', teams_routes_1.default);
router.use('/api/reqdoc-sql/features', features_routes_1.default);
router.use('/api/reqdoc-sql/reqs', reqs_routes_1.default);
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
const verbs_routes_user_1 = __importDefault(require("./projects/lesprit/verbs/verbs.routes.user"));
const verbs_routes_admin_1 = __importDefault(require("./projects/lesprit/verbs/verbs.routes.admin"));
router.use('/api/lesprit/user', users_routes_3.default);
router.use('/api/lesprit/words', words_routes_1.default);
router.use('/api/lesprit/admin/words', words_routes_admin_1.default);
router.use('/api/lesprit/lists', lists_routes_1.default);
router.use('/api/lesprit/user/verbs', verbs_routes_user_1.default);
router.use('/api/lesprit/admin/verbs', verbs_routes_admin_1.default);
/* ===================================
   Fluent
=================================== */
const words_routes_2 = __importDefault(require("./projects/fluent/words/words.routes"));
const groups_routes_1 = __importDefault(require("./projects/fluent/groups/groups.routes"));
const lessons_routes_1 = __importDefault(require("./projects/fluent/lessons/lessons.routes"));
const phrases_routes_1 = __importDefault(require("./projects/fluent/phrases/phrases.routes"));
router.use('/api/fluent/words', words_routes_2.default);
router.use('/api/fluent/groups', groups_routes_1.default);
router.use('/api/fluent/lessons', lessons_routes_1.default);
router.use('/api/fluent/phrases', phrases_routes_1.default);
/* ===================================
   False Idol
=================================== */
const drinks_routes_1 = __importDefault(require("./projects/falseIdol/drinks/drinks.routes"));
const users_routes_4 = __importDefault(require("./projects/falseIdol/users/users.routes"));
const images_routes_1 = __importDefault(require("./projects/falseIdol/images/images.routes"));
const settings_routes_1 = __importDefault(require("./projects/falseIdol/settings/settings.routes"));
router.use('/api/falseidol/drinks', drinks_routes_1.default);
router.use('/api/falseidol/users', users_routes_4.default);
router.use('/api/falseidol/images', images_routes_1.default);
router.use('/api/falseidol/settings', settings_routes_1.default);
/* ===================================
   Sandbox
=================================== */
const posts_routes_1 = __importDefault(require("./projects/sandbox/posts/posts.routes"));
router.use('/api/sandbox/posts', posts_routes_1.default);
exports.default = router;
