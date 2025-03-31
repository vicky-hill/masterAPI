export const feature = {
    path: 'feature'
}

export const features = {
    path: 'features',
    match: { main_feature: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
}

export const subFeatures = {
    path: 'sub_features',
    match: { deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } }
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

export const team = {
    path: 'team',
    populate: 'users.user'
}

export const project = {
    path: 'project',
    select: 'key slug'
}

export const reqs = {
    path: 'reqs',
    match: { changed_req: { $exists: false }, deleted: { $exists: false } },
    options: { sort: { sort: 'asc' } },
    populate: [history, comments]
}