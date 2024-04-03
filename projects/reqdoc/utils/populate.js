const features = {
    path: 'features',
    match: { main_feature: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
}

const subFeatures = {
    path: 'sub_features',
    match: { deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
}

const history = {
    path: 'history',
    select: 'title text latest_req createdAt',
    options: { sort: { createdAt: -1 } }
}

const comments = {
    path: 'comments',
    select: 'user text createdAt',
    options: { sort: { createdAt: -1 } },
    match: { deleted: { $exists: false } },
    populate: {
        path: 'user',
        select: 'name email'
    }
}

const team = {
    path: 'team',
    populate: 'users.user'
}

const project = {
    path: 'project',
    select: 'key slug'
}

const reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    populate: [history, comments]
}

module.exports = {
    history,
    team,
    reqs,
    features,
    features,
    project,
    subFeatures,
    comments
}