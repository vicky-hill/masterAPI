export const feature = {
    path: 'feature'
}

export const history = {
    path: 'history',
    select: 'title text latest_req createdAt',
    options: { sort: { createdAt: -1 } }
}

export const comments = {
    path: 'comments',
    select: 'user text createdAt',
    options: { sort: { createdAt: -1 } },
    match: { deleted: { $exists: false } },
    populate: {
        path: 'user',
        select: 'name email'
    }
}

export const reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } },
    populate: [history, comments]
}

export const features = {
    path: 'features',
    match: { main_feature: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
}

export const subFeatures = {
    path: 'sub_features',
    options: { sort: { sort: 'asc' } },
    match: { deleted: { $exists: false } },
    populate: {
        ...reqs,
        options: { sort: { sort: 'asc' } }
    }
}

export const mainFeature = {
    path: 'main_feature',
    select: 'name'
}

export const team = {
    path: 'team',
    populate: 'users.user'
}

export const project = {
    path: 'project',
    select: 'key slug'
}

