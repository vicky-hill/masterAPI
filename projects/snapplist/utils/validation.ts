import * as yup from 'yup'

const validateStrings = async (values: any, string: string) => {
    const fields: any = string.split(" ");
    const schemaObject: any = {};

    fields.forEach((field: any) => {
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

const validate = {
    createUser: async (values: any) => await validateStrings(values, "firebaseId email ~username ~fname ~lname")
}

export default validate;