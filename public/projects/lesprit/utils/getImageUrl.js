"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImageUrl = (image) => {
    if (!image)
        return `https://ik.imagekit.io/minite/Lesprit/default.png`;
    return `https://ik.imagekit.io/minite/Lesprit/${image}`;
};
exports.default = getImageUrl;
