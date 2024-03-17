const yup = require('yup');

const createReq = async (values) => {
    const schema = yup.object().shape({
        title: yup.string(),
        text: yup.string().required("No text was provided"),
        feature: yup.string().required("No feature was provided"),
    });

    await schema.validate(values, { abortEarly: false });
}

const updateReq = async (values) => {
    const schema = yup.object().shape({
        title: yup.string(),
        text: yup.string(),
    });

    await schema.validate(values, { abortEarly: false });
}

const createProject = async (values) => {
    const schema = yup.object().shape({
        name: yup.string("No name was provided"),
        team: yup.string("No team was provided")
    });

    await schema.validate(values, { abortEarly: false });
}

const createFeature = async (values) => {
    const schema = yup.object().shape({
        name: yup.string("No name was provided"),
        project: yup.string("No project ID was provided")
    });

    await schema.validate(values, { abortEarly: false });
}

const updateFeature = async (values) => {
    const schema = yup.object().shape({
        name: yup.string("No name was provided"),
    });

    await schema.validate(values, { abortEarly: false });
}

const createStep = async (values) => {
    const schema = yup.object().shape({
        text: yup.string("No text was provided")
    });

    await schema.validate(values, { abortEarly: false });
}

const sort = async (values) => {
    const schema = yup.array().of(
        yup.object().shape({
            _id: yup.string().required(),
            sort: yup.string().required()
        })
    ).required('req.body is missing the products array')

    await schema.validate(values, { abortEarly: false });
}

const createTeam = async (values) => {
    const schema = yup.object().shape({
        user: yup.string("No user was provided to add to team")
    });

    await schema.validate(values, { abortEarly: false });
}

module.exports = {
    createReq,
    updateReq,
    createProject,
    createFeature,
    updateFeature,
    createStep,
    createTeam,
    sort
};