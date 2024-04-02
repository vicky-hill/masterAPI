const yup = require('yup');

const validateStrings = async (values, string) => {
    const fields = string.split(" ");
    const schemaObject = {};

    fields.forEach(field => {
        const isOptional = field.startsWith('~');

        if (isOptional) {
            schemaObject[field.slice(1)] = yup.string()
        } else {
            schemaObject[field] = yup.string().required(`No ${field} was provided`)
        }
    })

    const schema = yup.object().shape(schemaObject);

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

const createReq = async (values) => {
    await validateStrings(values, "~title text feature");
}

const updateReq = async (values) => {
    await validateStrings(values, "~title ~text ~details");
}

const createProject = async (values) => {
    await validateStrings(values, "name team slug key");
}

const updateProject = async (values) => {
    await validateStrings(values, "~name ~slug");
}

const createFeature = async (values) => {
    await validateStrings(values, "name project");
}

const updateFeature = async (values) => {
    await validateStrings(values, "name");
}

const createTeam = async (values) => {
    await validateStrings(values, "user");
}

const addComment = async (values) => {
    await validateStrings(values, "user text");
}

const editComment = async (values) => {
    await validateStrings(values, "text");
}

const createUser = async (values) => {
    await validateStrings(values, "firebaseID email");
}

const updateUser = async (values) => {
    await validateStrings(values, "name");
}

module.exports = {
    validateStrings,
    createReq,
    updateReq,
    createProject,
    updateProject,
    createFeature,
    updateFeature,
    createTeam,
    addComment,
    editComment,
    createUser,
    updateUser,
    sort
};