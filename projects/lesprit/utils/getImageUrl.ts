
const getImageUrl = (image: string | undefined | null) => {
    if (!image) return `https://ik.imagekit.io/minite/Lesprit/default.png`;

    return `https://ik.imagekit.io/minite/Lesprit/${image}`
}

export default getImageUrl;