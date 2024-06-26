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

const createEvent = async (values) => {
    await validateStrings(values, "name user");
}

const createUser = async (values) => {
    await validateStrings(values, "firebaseID email");
}

const createImage = async (values) => {
    await validateStrings(values, "url filePath fileName thumbnail name event user imageID");
}

module.exports = {
    validateStrings,
    createEvent,
    createUser,
    createImage
};