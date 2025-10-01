"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGroupToResponse = mapGroupToResponse;
function mapGroupToResponse(groupInstance) {
    const group = groupInstance.get({ plain: true });
    const words = groupInstance.words;
    return {
        groupId: group.groupId,
        name: group.name,
        categories: groupInstance.categories || [],
        words: {
            spanish: words.flatMap((w) => w.translations || [])
                .filter((w) => w.language === "spanish")
                .map((w) => w.base),
            french: words.flatMap((w) => w.translations || [])
                .filter((w) => w.language === "french")
                .map((w) => w.base),
            italian: words.flatMap((w) => w.translations || [])
                .filter((w) => w.language === "italian")
                .map((w) => w.base),
        }
    };
}
