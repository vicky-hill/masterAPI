const yup = require('yup');

const validate = {
    async createReq(values) {
        const schema = yup.object().shape({
            title: yup.string(),
            text: yup.string().required("Please enter text for the requirement"),
            feature: yup.string().required("No feature was provided in req body"),
        });

        await schema.validate(values, { abortEarly: false });
    }
}

module.exports = validate;