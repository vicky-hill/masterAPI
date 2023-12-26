const Item = require('./items.model')
const ImageKit = require('imagekit')

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});

const dev = async (req, res) => {
    try {
        // const items = await Item.updateMany({ location: { _id: "6533eab837aba85d40329a39" } }, { location: '654e64423c1259ced926ef0d' }, { new: true });   
        // const items = await Item.find().populate('location');

        // const changeItems = items.filter(item => (
        //     item.location && item.location._id.toString() === "654e6a405c0b168228252997"
        // ));

        // const updatedItems = await Promise.all(changeItems.map((item) => (
        //     Item.findByIdAndUpdate(item._id, { location: '65523c236dca81937df0c968' }, { new: true }).populate('location')
        // )));
       
        // res.json(updatedItems);
    } catch (err) {
        console.log(err);
    }
}


/**
 * Get all user items
 * @header x-auth-token
 * @returns [{ item }]
 */
const getItems = async (req, res) => {
    try {
        const items = await Item.find({ trash: false, user: req.user._id })
            .populate('location')
            .sort({ createdAt: -1 });

        res.json(items);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get one item
 * @header x-auth-token
 * @param id - ID of item to fetch
 * @returns item {}   
 */
const getItemByID = async (req, res) => {
    try {
        const item = req.item;
        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create an item
 * @header x-auth-token
 * @property {String} req.body.name 
 * @property {String} req.body.description 
 * @property {String} req.body.category 
 * @property {String} req.body.image 
 * @property {String} req.body.location 
 * @returns item {}   
 */
const createItem = async (req, res) => {
    try {
        const createdItem = await Item.create({
            ...req.body,
            user: req.user._id
        });

        const item = await Item.findById(createdItem._id).populate('location user');

        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Update item
 * @param id
 * @property {String} req.body.name 
 * @property {String} req.body.description 
 * @property {String} req.body.category 
 * @property {String} req.body.image 
 * @property {String} req.body.location 
 * @returns item {}   
 */
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('location user');

        res.json(updatedItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Delete item
 * @param id
 * @returns item {}   
 */
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.json(deletedItem);
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Move Item
 * @param id - Item ID
 * @property { string } req.body.location - Where to move the item
 * @returns item {}       
 */
const moveItem = async (req, res) => {
    try {
        const { location } = req.body;
        const item = await Item.findByIdAndUpdate(req.params.id, { location }, { new: true }).populate('location');

        res.json(item);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Trash Item
 * @param id - Item ID
 * @returns item {}   
 */
const trashItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, { trash: true }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}


/**
 * Move Items
 * @property {array} ids 
 * @property {string} req.body.location - Where to move the item
 * @returns [{ item }]  
 */
const moveItems = async (req, res) => {
    try {
        const { location } = req.body;

        const items = await Promise.all(req.body.ids.map((id) => (
            Item.findByIdAndUpdate(id, { location }, { new: true }).populate('location')
        )));

        res.json(items);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

/**
 * Trash Items
 * @property {array} ids 
 * @returns [{ item }]  
 */
const trashItems = async (req, res) => {
    try {
        const items = await Promise.all(req.body.ids.map((id) => (
            Item.findByIdAndUpdate(id, { trash: true }, { new: true })
        )))

        res.json(items);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

/**
 * Image Kit Auth
 * @returns { token, expire, signature }
 */
const imageKitAuth = async (req, res) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}


module.exports = {
    dev,
    getItems,
    getItemByID,
    createItem,
    updateItem,
    deleteItem,
    moveItem,
    trashItem,
    moveItems,
    trashItems,
    imageKitAuth
}