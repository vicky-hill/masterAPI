import { FeatureAttributes, ProjectAttributes, ReqAttributes } from '../../../types/reqdoc/attributes.types';
import throwError from '../../../utils/throwError';
import Feature from '../features/features.model'
import Project from '../projects/projects.model'
import { checkCommentAccess, checkFeatureAccess, checkProjectAccess, checkReqAccess } from '../utils/access';
import { subFeatures, reqs as reqsPopulate, history, features, comments, feature, project } from '../utils/populate';
import Req from './reqs.model'
import { Request, Response, NextFunction } from 'express';
import { findReqByID } from './reqs.utils';
import { AddComment, ChangeReq, CreateReq, EditComment, SortReqs, UpdateReq } from '../../../types/reqdoc/payloads.types';
import validate from '../utils/validation';
import { cascadeDeleteReq } from '../utils/delete';

export const getFeatureReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const feature: FeatureAttributes | null = await Feature.findById(featureID)
            .populate({
                ...subFeatures,
                populate: reqsPopulate
            })

        if (!feature) return throwError('Feature not found');

        const reqs = await Req
            .find({ feature: featureID, changed_req: { $exists: false } })
            // .populate([history, features])
            .populate([history])
            .sort({ sort: 1 })

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

        res.json({ data: [...reqs, ...subFeatureReqs] });
    } catch (err: any) {
        err.ctrl = getFeatureReqs;
        next(err);
    }
}

export const getProjectReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const reqs: ReqAttributes[] = await Req
            .find({ project: projectID, changed_req: { $exists: false } })
            .populate([history])
            .sort({ sort: 1 });

        res.json({ data: [...reqs] });
    } catch (err: any) {
        err.ctrl = getProjectReqs;
        next(err);
    }
}

export const getReqById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.user;
        const { reqID } = req.params;

        await checkReqAccess(reqID, userID);

        const requirement = await findReqByID(reqID);

        res.json(requirement);
    } catch (err: any) {
        err.ctrl = getReqById;
        next(err);
    }
}

export const getReqByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.user;
        const { reqKey, projectKey } = req.params;

        const project: ProjectAttributes | null = await Project.findOne({ slug: projectKey })

        if (!project) return throwError('Project not found');

        const requirement: ReqAttributes | null = await Req
            .findOne({
                changed_req: { $exists: false },
                key: { $regex: new RegExp(reqKey, 'i') },
                project: project._id
            })
            .populate([history, comments, feature]);

        if (!requirement) return throwError('Req not found');

        await checkReqAccess(requirement._id, userID);

        res.json(requirement);
    } catch (err: any) {
        err.ctrl = getReqByKey;
        next(err);
    }
}

export const createReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateReq;

        const featureID = req.body.feature;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);
        await validate.createReq(req.body);

        const reqs: ReqAttributes[] = await Req.find({ feature: featureID, changed_req: { $exists: false } });

        const feature = await Feature
            .findById(featureID)
            .populate({ path: 'project', select: 'key' })

        if (!feature) return throwError(`Feature with _id ${featureID} does not exist, can't create req for non existing feature`);

        const allProjectReqs = await Req.find({ project: feature.project, changed_req: { $exists: false } });
        const keyNumber = allProjectReqs.length + 1;

        const requirement: ReqAttributes = await Req.create({
            ...req.body,
            key: `${feature.project.key}-${keyNumber.toString().padStart(3, '0')}`,
            sort: reqs.length,
            project: feature.project
        });

        res.json(requirement);
    } catch (err: any) {
        err.ctrl = createReq;
        next(err);
    }
}

export const updateReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateReq;

        const { reqID } = req.params;
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);
        await validate.updateReq(req.body);

        const updatedReq: ReqAttributes | null = await Req.findByIdAndUpdate(reqID, req.body, { new: true });

        if (!updatedReq) return throwError(`Req not found: ${reqID}`);

        const requirement = await findReqByID(updatedReq._id);

        res.status(200).json(requirement);
    } catch (err: any) {
        err.ctrl = updateReq;
        next(err);
    }
}

export const deleteReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqID = req.params.reqID;
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);

        const deletedReq = await cascadeDeleteReq(reqID);

        res.status(200).json(deletedReq);
    } catch (err: any) {
        err.ctrl = deleteReq;
        next(err);
    }
}

export const changeReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as ChangeReq;

        const { reqID } = req.params;
        const { title, text } = req.body;
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);
        await validate.updateReq(req.body);

        const changedReq: ReqAttributes | null = await Req.findById(reqID);

        if (!changedReq) return throwError('Req not found');

        const newReq = {
            key: changedReq.key,
            title: changedReq.title,
            text: changedReq.text,
            project: changedReq.project,
            feature: changedReq.feature,
            sort: changedReq.sort
        };

        if (title) newReq.title = title;
        if (text) newReq.text = text;

        const { _id }: ReqAttributes = await Req.create(newReq)

        console.log({ changed_req: changedReq.key })

        await Req.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true })

        await Req.updateMany(
            { key: changedReq.key, changed_req: { $exists: true } },
            { latest_req: _id },
            { new: true }
        );

        const latestReq = await findReqByID(_id)

        res.json(latestReq);
    } catch (err: any) {
        err.ctrl = changeReq;
        next(err);
    }
}

export const sortReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as SortReqs;

        await validate.sort(req.body);
        const { userID } = req.user;

        await checkReqAccess(req.body[0]._id, userID);

        const data = [];

        for (const requirement of req.body) {
            const { _id, sort } = requirement;
            const updatedReq = await Req.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedReq);
        }

        res.json({ data });
    } catch (err: any) {
        err.ctrl = sortReqs;
        next(err);
    }
}

export const searchReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { term } = req.query;
        const { projectID } = req.params;

        const reqs: ReqAttributes[] = await Req.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: term, $options: 'i' } },
                        { text: { $regex: term, $options: 'i' } },
                    ]
                },
                { project: projectID },
                { deleted: { $exists: false } },
                { changed_req: { $exists: false } }
            ]
        }).populate(project)

        const history = await Req.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: term, $options: 'i' } },
                        { text: { $regex: term, $options: 'i' } }
                    ]
                },
                { project: projectID },
                { deleted: { $exists: false } },
                { changed_req: { $exists: true } }
            ]
        }).populate(project);

        res.json({ data: { reqs, history } });
    } catch (err: any) {
        err.ctrl = searchReqs;
        next(err);
    }
}

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as AddComment;

        const { _id: user } = req.user;
        const { reqID } = req.params;
        const { text } = req.body;

        const comment = { user, text };

        await checkReqAccess(reqID, user);

        await validate.addComment(comment);

        const updatedReq: ReqAttributes | null = await Req.findByIdAndUpdate(
            reqID,
            { $push: { comments: comment } },
            { new: true }
        ).populate([history, comments]);

        if (!updateReq) return throwError('Req not found');

        res.json(updatedReq)
    } catch (err: any) {
        err.ctrl = addComment;
        next(err);
    }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id: user } = req.user;
        const { commentID } = req.params;
        const { text } = req.body;

        await checkCommentAccess(commentID, user);

        await validate.editComment(req.body);

        const updatedReq: ReqAttributes | null = await Req.findOneAndUpdate({ "comments._id": commentID },
            { "$set": { "comments.$.text": text, "comments.$.edited": true } }, { new: true })
            .populate([history, comments]);

        if (!updatedReq) return throwError('Req not found');

        res.json(updatedReq);
    } catch (err: any) {
        err.ctrl = editComment;
        next(err);
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as EditComment;

        const { _id: user } = req.user;
        const { commentID } = req.params;

        await checkCommentAccess(commentID, user);

        const updatedReq: ReqAttributes | null = await Req.findOneAndUpdate({ "comments._id": commentID },
            { "$set": { "comments.$.deleted": new Date(), "comments.$.edit": true } }, { new: true })
            .populate([history, comments]);

        if (!updatedReq) return throwError('Req not found');

        res.json(updatedReq);
    } catch (err: any) {
        err.ctrl = deleteComment;
        next(err);
    }
}
