const Notes = require('./notes.model')


const getNotes = async (req, res, next) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const getNotesById = async (req, res, next) => {
    try {
        const { notesId } = req.params;
        const notes = await Notes.findById(notesId);
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const createNotes = async (req, res, next) => {
    try {
        const notes = await Notes.create({ ...req.body, done: false });
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const updateNotes = async (req, res, next) => {
    try {
        const { notesId } = req.params;

        const updatedNotes = await Notes.findByIdAndUpdate(
            notesId, req.body, { new: true }
        );

        const notes = await Notes.findById(updatedNotes._id);

        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const deleteNotes = async (req, res, next) => {
    try {
        const { notesId } = req.params;

        const notes = await Notes.findByIdAndDelete(notesId)

        res.json(notes);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
}