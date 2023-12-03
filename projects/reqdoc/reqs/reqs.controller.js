const Req = require('./reqs.model')
const Feature = require('../features/features.model')

/**
 * Get reqs
 * @param feature - id of feature
 * @returns [{ req }]
 */
async function getReqs(req, res) {
    try {
        const reqs = await Req
            .find({ features: req.params.feature, changed_req: { $exists: false } })
            .populate({
                path: 'history',
                options: { sort: { createdAt: 'desc' } } 
            })
            .sort({ sort: 1 });

        res.json(reqs);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get req by ID
 * @param id - ID of req to fetch
 * @returns req {}   
 */
async function getReq(req, res) {
    try {
        const requirement = await Req.findById(req.params.id).populate('history');
        res.json(requirement);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a req
 * @property {String} req.body.title 
 * @property {String} req.body.text 
 * @property {String} req.body.feature 
 * @returns req {}   
 */
async function createReq(req, res) {
    try {
        const reqs = await Req.find({ feature: req.body.feature, changed_req: { $exists: false } });
        const feature = await Feature.findById(req.body.feature);
        
        const allProjectReqs = await Req.find({ project: feature.project, changed_req: { $exists: false } });
        const keyNumber = allProjectReqs.length + 1;

        const requirement = await Req.create({
            ...req.body,
            key: `Req-${keyNumber.toString().padStart(3, 0)}`,
            sort: reqs.length,
            project: feature.project
        });

        res.json(requirement);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Update req
 * @params id
 * @property {String} req.body.name 
 * @returns req {}   
 */
async function updateReq(req, res, next) {
    try {
        const updatedReq = await Req.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedReq) {
            return res.status(404).json({ msg: "Req not found" });
        }

        const requirement = await Req.findById(updatedReq._id);

        res.status(200).json(requirement);
    } catch (err) {
        next(err);
    }
}

/**
 * Change a req
 * @param reqID
 * @property {String} req.body.title 
 * @property {String} req.body.text 
 * @returns latest req {}   
 */
async function changeReq(req, res) {
    try {
        const { reqID } = req.params;
        const { title, text } = req.body;

        const changedReq = await Req.findById(reqID);

        const newReq = { 
            key: changedReq.key,
            title: changedReq.title,
            text: changedReq.text,
            project: changedReq.project,
            feature: changedReq.feature,
            sort: changedReq.sort
         }; 


        if (title) newReq.text = title;
        if (text) newReq.text = text;

        const latestReq = await Req.create(newReq);

        await Req.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true});

        res.json(latestReq);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}



module.exports = {
  getReqs, 
  getReq,
  createReq,
  updateReq,
  changeReq
}