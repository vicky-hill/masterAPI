const yup = require('yup');

const createCategory = async (values) => {
    const schema = yup.object().shape({
        name: yup.string().required("No name was provided"),
        status: yup.string().optional().oneOf(['inactive', 'active'])
    });

    await schema.validate(values, { abortEarly: false });
}

const updateCategory = async (values) => {
    const schema = yup.object().shape({
        name: yup.string(),
        status: yup.string().oneOf(['inactive', 'active']),
    }); 

    await schema.validate(values, { abortEarly: false });
}


module.exports = {
    createCategory,
    updateCategory,
};