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

const steps = {
    path: 'steps',
    select: 'text',
    options: { sort: { sort: 'asc' } },
    match: { deleted: { $exists: false } }
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
    select: 'key'
}

const reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    populate: [steps, history, comments]
}

module.exports = {
    history,
    steps,
    team,
    reqs,
    features,
    features,
    project,
    subFeatures,
    comments
}