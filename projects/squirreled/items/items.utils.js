const Item = require("./items.model")

const getItem = async (req, res, id) => {
    try {
        const item = await Item.findById(req.params.id || id).populate('location user');

        if (!item || item.user._id.toString() !== req.user._id.toString()) {
            res.status(404).json({ msg: "Item not found" });
        
        } else {
            return item;
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getItem
}