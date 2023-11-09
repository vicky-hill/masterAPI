const Item = require('./items.model');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});

async function assignItems(req, res) {
    try {
        
        const items = await Item.updateMany({ }, { user: req.user._id }, { new: true });

        res.json(items);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get all user items
 * @returns [{ item }]
 */
async function getItems(req, res) {
    try {            
        const items = await Item.find({ trash: false, user: req.user._id })
        .populate('location user')
        .sort({createdAt: -1});
 
        res.json(items);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get one item
 * @param id - ID of item to fetch
 * @returns item {}   
 */
async function getItem(req, res) {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create an item
 * @property {String} req.body.name 
 * @property {String} req.body.description 
 * @property {String} req.body.category 
 * @property {String} req.body.image 
 * @property {String} req.body.location 
 * @returns item {}   
 */
async function saveItem(req, res) {
    try {
        const createdItem = await Item.create(req.body);
        const item = await Item.findById(createdItem._id).populate('location')
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
async function updateItem(req, res) {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json(item);
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
async function deleteItem(req, res) {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json(item)
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
async function moveItem(req, res) {
    try {
        const { location } = req.body;
        const item = await Item.findByIdAndUpdate(req.params.id, { location }, { new: true }).populate('location');

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

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
async function trashItem(req, res) {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, { trash: true }, { new: true });

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

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
async function moveItems(req, res) {
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
async function trashItems(req, res) {
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
async function imageKitAuth(req, res) {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}


module.exports = {
    getItems,
    getItem,
    saveItem,
    updateItem,
    deleteItem,
    moveItem,
    trashItem,
    moveItems,
    trashItems,
    imageKitAuth,
    assignItems
}