"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = exports.team = exports.mainFeature = exports.subFeatures = exports.features = exports.reqs = exports.comments = exports.history = exports.feature = void 0;
exports.feature = {
    path: 'feature'
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
exports.reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } },
    populate: [exports.history, exports.comments]
};
exports.features = {
    path: 'features',
    match: { main_feature: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
};
exports.subFeatures = {
    path: 'sub_features',
    options: { sort: { sort: 'asc' } },
    match: { deleted: { $exists: false } },
    populate: Object.assign(Object.assign({}, exports.reqs), { options: { sort: { sort: 'asc' } } })
};
exports.mainFeature = {
    path: 'main_feature',
    select: 'name'
};
exports.team = {
    path: 'team',
    populate: 'users.user'
};
exports.project = {
    path: 'project',
    select: 'key slug'
};
