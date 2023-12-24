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

module.exports = {
    createReq,
    updateReq,
    createProject,
    createFeature,
    updateFeature
};