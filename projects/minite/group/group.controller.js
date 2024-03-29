const Group = require('./group.model');

const getAllMyGroups = async (req, res) => {
    try {
        const groups = await Group.find( { $or: [ { owner: req.user.id }, { members: { $in: req.user.id } } ] } )
            .populate('images')
            .populate('members')
        
            res.status(200).json(groups);
    } catch (err) {
        res.status(500);
        console.log(err)
    }
}

const getOneGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('images');

        if(!group) {
            return res.status(404).json({ msg: 'Group not found'});
        }

        res.status(200).json(group)
    } catch (err) {
        console.log(err)
    }
}

const saveGroup = async (req, res) => {
    try {
        req.body.owner = req.user.id;
        const group =  await Group.create(req.body);
        
        res.status(201).json(group);
    } catch (err) {
        res.status(500)
    }
}

const addMembers = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, {$push: { members: { $each: req.body.members }}}, { new: true});

        res.status(201).json(group);
    } catch (err) {
        res.status(500);
        console.log(err);
    }
}

const addImages = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, {$push: { images: { $each: req.body.images }}}, { new: true});
        res.status(201).json(group);
    } catch (err) {
        res.status(500);
        console.log(err);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            res.status(404).json({ msg: 'Group not found'});
        }

        group.remove();

        res.status(200).json(group)
    } catch (err) {
        res.status(500);
        console.log(err)
    }
}


module.exports = {
    getAllMyGroups,
    getOneGroup,
    saveGroup,
    addMembers,
    addImages,
    deleteGroup
}