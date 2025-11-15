import ImageModel from './images.model'


export const getImages = async () => {
    const imageInstances = await ImageModel.findAll({
        where: {} 
    });

    const images = imageInstances.map((imageInstance) => {
        const image = imageInstance.get({ plain: true });
        return { ...image };
    })

    return images;
}

export const importImages = async (data: any) => {
    const images = await ImageModel.bulkCreate(data);
    return images;
}