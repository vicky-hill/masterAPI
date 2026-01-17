"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./projects/sandbox/utils/models");
require("./projects/falseidol/utils/models");
const router = express_1.default.Router();
router.get('/login/:site', (req, res, next) => {
    var _a;
    try {
        const site = req.params.site;
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(401).json({ msg: 'No valid token' });
        let userId;
        if (token === 'admin') {
            if (site === 'reqdoc')
                userId = process.env.ADMIN_REQDOC;
            if (site === 'falseidol')
                userId = process.env.ADMIN_FALSEIDOL;
        }
        else {
            const decoded = (0, jwt_decode_1.default)(token);
            userId = decoded.user_id;
        }
        const session = JSON.parse(((_a = req.session) === null || _a === void 0 ? void 0 : _a.token) || '{}');
        if (session) {
            req.session = {
                token: JSON.stringify(Object.assign(Object.assign({}, session), { [site]: userId }))
            };
        }
        else {
            req.session = {
                token: JSON.stringify({
                    [site]: userId
                })
            };
        }
        res.json('logged in');
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
});
router.get('/logout/:site', (req, res, next) => {
    var _a;
    try {
        const site = req.params.site;
        const session = JSON.parse(((_a = req.session) === null || _a === void 0 ? void 0 : _a.token) || '{}');
        delete session[site];
        if (session) {
            req.session = {
                token: JSON.stringify(session)
            };
        }
        res.json('logged out');
    }
    catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
});
router.get('/session', (req, res, next) => {
    var _a;
    try {
        const session = JSON.parse(((_a = req.session) === null || _a === void 0 ? void 0 : _a.token) || '{}');
        console.log(req.session);
        res.json(session);
    }
    catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
});
/* ===================================
   Reqdoc
=================================== */
const users_routes_1 = __importDefault(require("./projects/reqdoc/users/users.routes"));
const teams_routes_1 = __importDefault(require("./projects/reqdoc/teams/teams.routes"));
const features_routes_1 = __importDefault(require("./projects/reqdoc/features/features.routes"));
const reqs_routes_1 = __importDefault(require("./projects/reqdoc/reqs/reqs.routes"));
const projects_routes_1 = __importDefault(require("./projects/reqdoc/projects/projects.routes"));
router.use('/api/reqdoc/users', users_routes_1.default);
router.use('/api/reqdoc/teams', teams_routes_1.default);
router.use('/api/reqdoc/features', features_routes_1.default);
router.use('/api/reqdoc/reqs', reqs_routes_1.default);
router.use('/api/reqdoc/projects', projects_routes_1.default);
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
const drinks_routes_1 = __importDefault(require("./projects/falseidol/drinks/drinks.routes"));
const users_routes_4 = __importDefault(require("./projects/falseidol/users/users.routes"));
const images_routes_1 = __importDefault(require("./projects/falseidol/images/images.routes"));
const settings_routes_1 = __importDefault(require("./projects/falseidol/settings/settings.routes"));
router.use('/api/falseidol/drinks', drinks_routes_1.default);
router.use('/api/falseidol/users', users_routes_4.default);
router.use('/api/falseidol/images', images_routes_1.default);
router.use('/api/falseidol/settings', settings_routes_1.default);
/* ===================================
   Sandbox
=================================== */
const posts_routes_1 = __importDefault(require("./projects/sandbox/posts/posts.routes"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
router.use('/api/sandbox/posts', posts_routes_1.default);
exports.default = router;
