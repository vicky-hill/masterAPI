const List = require('./lists.model');
const Word = require('../words/words.model')

/* ===================================
   Get all lists
=================================== */
const getLists = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json(lists);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


/* ===================================
   Save list
=================================== */
const saveList = async (req, res) => {
    try {
        const reqList = { 
            title: req.body.title,
            user: req.user.id
        }

        const list = await List.create(reqList);
        res.status(201).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Get one list
=================================== */
const getList = async (req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!list) {
            return res.status(404).json({msg: "List not found"});
        }

        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Update list
=================================== */
const updateList = async (req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!list) {
            return res.status(404).json({msg: "List not found"});
        }

        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


/* ===================================
   Delete list
=================================== */
const deleteList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);

        if(!list) {
            return res.status(404).json({msg: "List not found"});
        }
    
        list.remove();
    
        res.status(200).json(list)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Delete all lists from user
=================================== */
const deleteUserLists = async (req, res) => {
    try {

        const words = await Word.deleteMany({ user: req.user.id })
        const lists = await List.deleteMany({ user: req.user.id })

        res.status(200).json({ 
            deleted: lists.deletedCount
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


module.exports = {
    getLists, 
    saveList, 
    getList, 
    updateList, 
    deleteList,
    deleteUserLists
}