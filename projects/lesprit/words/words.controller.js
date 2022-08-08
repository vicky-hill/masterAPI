const Word = require('./words.model');

/* ===================================
   Get all words
=================================== */
async function getWords (req, res) {
    try {
        const words = await Word.find({ user: req.user.id}).populate({
            path: 'list',
            select: 'title'
        }).sort({ createdAt: -1 });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Get one word
=================================== */
async function getWord (req, res) {
    try {
        const word = await Word.findById(req.params.id);

        if(!word) {
            return res.status(404).json({msg: "Word not found"});
        }

        res.status(200).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


/* ===================================
   Get review
=================================== */
async function getReview (req, res) {
    try {
        const words = await Word.find({ dueDate: { $lte: Date.now() }, user: req.user.id });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


/* ===================================
   Save word
=================================== */
async function saveWord (req, res) {
    try {
        const reqWord = {
            foreign: req.body.foreign,
            native: req.body.native,
            phrases: req.body.phrases,
            list: req.body.list,
            user: req.user.id
        }

        const newWord = await Word.create(reqWord);

        const word = await Word.findById(newWord._id).populate({
            path: 'list',
            select: 'title'
        });

        res.status(201).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Update word
=================================== */
async function updateWord (req, res) {
    try {
        const updateWord = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!updateWord) {
            return res.status(404).json({msg: "Word not found"});
        }

        const word = await Word.findById(updateWord._id).populate({
            path: 'list',
            select: 'title'
        });

        res.status(200).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Delete word
=================================== */
async function deleteWord (req,res) {
    try {
        const word = await Word.findByIdAndDelete(req.params.id);

        if(!word) {
            return res.status(404).json({msg: "Word not found"});
        }
    
        res.status(200).json(word)
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong'});
    }
}





/* ===================================
   Dev Routes
=================================== */
async function devAll (req, res) {
    try {
        const allWords = await Word.updateMany({}, {$rename: {'spanish': 'foreign'}});

        if(!allWords) {
            return res.status(404).json({msg: "No words found"});
        }

        res.status(200).json(allWords);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}


module.exports = {
    getWords, 
    getWord, 
    getReview, 
    saveWord, 
    updateWord, 
    deleteWord, 
    devAll
}