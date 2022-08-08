const List = require('./lists.model');
const Word = require('../words/words.model')

/* ===================================
   Get all lists
=================================== */
async function getLists (req, res) {
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
async function saveList (req, res) {
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
async function getList (req, res) {
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
async function updateList (req, res) {
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
async function deleteList (req, res) {
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
async function deleteUserLists (req, res) {
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