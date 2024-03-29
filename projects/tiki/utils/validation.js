const yup = require('yup');

const createProduct = async (values) => {
    const schema = yup.object().shape({
        name: yup.string().required("No name was provided"),
        short_description: yup.string().required("No short description was provided"),
        description: yup.string().required("No description was provided"),
        price: yup.string().required("No price was provided"),
        quantity: yup.string().required("No quantity was provided"),
        category: yup.string().required("No category was provided"),
        images: yup.array()
            .of(yup.object())
            .min(1, "At least one image is required")
            .required("No image was provided"),
        urlKey: yup.string().required("No url key was provided")
    });

    await schema.validate(values, { abortEarly: false });
}

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

const sortProducts = async (values) => {
    const schema = yup.array().of(
        yup.object().shape({
            _id: yup.string().required(),
            sort: yup.string().required()
        })
    ).required('req.body is missing the products array')

    await schema.validate(values, { abortEarly: false });
}

const sortCategories = async (values) => {
    const schema = yup.array().of(
        yup.object().shape({
            _id: yup.string().required(),
            sort: yup.string().required()
        })
    ).required('req.body is missing the categories array')

    await schema.validate(values, { abortEarly: false });
}

const addToCart = async (values) => {
    const schema = yup.object().shape({
        productID: yup.string().required(),
        quantity: yup.string().required()
    });

    await schema.validate(values, { abortEarly: false });
}




module.exports = {
    createProduct,
    createCategory,
    updateCategory,
    sortProducts,
    sortCategories,
    addToCart
};