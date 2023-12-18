const yup = require('yup');

async function createReq(values) {
    const schema = yup.object().shape({
        title: yup.string(),
        text: yup.string().required("No text was provided"),
        feature: yup.string().required("No feature was provided"),
    });

    await schema.validate(values, { abortEarly: false });
}

async function updateReq(values) {
    const schema = yup.object().shape({
        title: yup.string(),
        text: yup.string(),
    });

    await schema.validate(values, { abortEarly: false });
}

async function createProject(values) {
    const schema = yup.object().shape({
        name: yup.string("No name was provided"),
    });

    await schema.validate(values, { abortEarly: false });
}



module.exports = {
    createReq,
    updateReq,
    createProject
};