"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqs = exports.project = exports.team = exports.comments = exports.history = exports.subFeatures = exports.features = exports.feature = void 0;
exports.feature = {
    path: 'features'
};
exports.features = {
    path: 'features',
    match: { main_feature: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
};
exports.subFeatures = {
    path: 'sub_features',
    match: { deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
};
exports.history = {
    path: 'history',
    select: 'title text latest_req createdAt',
    options: { sort: { createdAt: -1 } }
};
exports.comments = {
    path: 'comments',
    select: 'user text createdAt',
    options: { sort: { createdAt: -1 } },
    match: { deleted: { $exists: false } },
    populate: {
        path: 'user',
        select: 'name email'
    }
};
exports.team = {
    path: 'team',
    populate: 'users.user'
};
exports.project = {
    path: 'project',
    select: 'key slug'
};
exports.reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    populate: [exports.history, exports.comments]
};
