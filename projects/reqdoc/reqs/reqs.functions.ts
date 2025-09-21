import { AddComment, ChangeReq, CreateReq, EditComment, SortReqs, UpdateReq } from '../../../types/reqdoc/payloads.types'
import { FeatureAttributes, ReqAttributes, ProjectAttributes } from '../../../types/reqdoc/attributes.types'
import throwError from '../../../utils/throwError'
import Feature from '../features/features.model'
import { checkFeatureAccess, checkProjectAccess, checkReqAccess, checkCommentAccess } from '../utils/access'
import { subFeatures, reqs as reqsPopulate, history, feature, project, comments } from '../utils/populate'
import Req from './reqs.model'
import { findReqByID } from './reqs.utils'
import Project from '../projects/projects.model'
import validate from '../utils/validation'
import { cascadeDeleteReq } from '../utils/delete'
import { getValue, setValue } from '../../../utils/redis'
import {invalidateFeatureCache} from '../features/features.utils';


export const getFeatureReqs = async (featureId: string, userId: string) => {
    // const cacheKey = `reqs:feature:${featureId}`;
    // const cached = await getValue(cacheKey);
    
    // if (cached) return cached;
 
    await checkFeatureAccess(featureId, userId);

    const feature: FeatureAttributes | null = await Feature.findById(featureId)
        .populate({
            ...subFeatures,
            populate: reqsPopulate
        })

    if (!feature) return throwError('Feature not found');

    const reqs = await Req
        .find({ feature: featureId, changed_req: { $exists: false } })
        // .populate([history, features])
        .populate([history])
        .sort({ sort: 1 })

    const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

    // await setValue(cacheKey, [...reqs, ...subFeatureReqs]);

    return { data: [...reqs, ...subFeatureReqs] }
}


export const getProjectReqs = async (projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    const reqs: ReqAttributes[] = await Req
        .find({ project: projectId, changed_req: { $exists: false } })
        .populate([history])
        .sort({ sort: 1 });

    return { data: [...reqs] };
}


export const getReqById = async (reqId: string, userId: string) => {
    await checkReqAccess(reqId, userId);
    const requirement = await findReqByID(reqId);

    return requirement;
}


export const getReqByKey = async (reqKey: string, projectKey: string, userId: string) => {
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

    await checkReqAccess(requirement._id, userId);

    return requirement;
}


export const createReq = async (data: CreateReq, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);
    await validate.createReq(data);

    const reqs: ReqAttributes[] = await Req.find({ feature: featureId, changed_req: { $exists: false } });

    const feature = await Feature
        .findById(featureId)
        .populate({ path: 'project', select: 'key' })

    if (!feature) return throwError(`Feature with _id ${featureId} does not exist, can't create req for non existing feature`);

    const allProjectReqs = await Req.find({ project: feature.project, changed_req: { $exists: false } });
    const keyNumber = allProjectReqs.length + 1;

    const newReq: ReqAttributes = await Req.create({
        ...data,
        key: `${feature.project.key}-${keyNumber.toString().padStart(3, '0')}`,
        sort: reqs.length,
        project: feature.project
    });

    const requirement = await findReqByID(newReq._id);

    await invalidateFeatureCache(featureId);

    return requirement;
}


export const updateReq = async (data: UpdateReq, reqId: string, userId: string) => {
    await checkReqAccess(reqId, userId);
    await validate.updateReq(data);

    const updatedReq: ReqAttributes | null = await Req.findByIdAndUpdate(reqId, data, { new: true });

    if (!updatedReq) return throwError(`Req not found: ${reqId}`);

    const requirement = await findReqByID(updatedReq._id);

    await invalidateFeatureCache(updatedReq.feature.toString());

    return requirement;
}


export const deleteReq = async (reqId: string, userId: string) => {
    await checkReqAccess(reqId, userId);
    const deletedReq = await cascadeDeleteReq(reqId);

    await invalidateFeatureCache(deletedReq.feature.toString());

    return deletedReq;
}


export const changeReq = async (data: ChangeReq, reqId: string, userId: string) => {
    const { title, text } = data;

    await checkReqAccess(reqId, userId);
    await validate.updateReq(data);

    const changedReq: ReqAttributes | null = await Req.findById(reqId);

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

    const { _id }: ReqAttributes = await Req.create(newReq);

    await Req.findByIdAndUpdate(reqId, { changed_req: changedReq.key }, { new: true })

    await Req.updateMany(
        { key: changedReq.key, changed_req: { $exists: true } },
        { latest_req: _id },
        { new: true }
    );

    const latestReq = await findReqByID(_id);

    await invalidateFeatureCache(changedReq.feature.toString());

    return latestReq;
}


export const sortReqs = async (data: any, userId: string) => {
    data as SortReqs;

    await validate.sort(data);
    await checkReqAccess(data[0]._id, userId);

    const reqs: ReqAttributes[] = [];

    for (const requirement of data) {
        const { _id, sort } = requirement;
        const updatedReq = await Req.findByIdAndUpdate(_id, { sort }, { new: true, populate: 'feature' });
        updatedReq && reqs.push(updatedReq);
    }

    const mainFeatureId = reqs[0].feature.main_feature 
        ? reqs[0].feature.main_feature.toString() 
        : reqs[0].feature._id.toString()

    await invalidateFeatureCache(mainFeatureId);

    return reqs;
}


export const searchReqs = async (projectId: string, term: any) => {
    const reqs: ReqAttributes[] = await Req.find({
        $and: [
            {
                $or: [
                    { title: { $regex: term, $options: 'i' } },
                    { text: { $regex: term, $options: 'i' } },
                ]
            },
            { project: projectId },
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
            { project: projectId },
            { deleted: { $exists: false } },
            { changed_req: { $exists: true } }
        ]
    }).populate(project);

    return { data: { reqs, history } }
}


export const addComment = async (data: AddComment, reqId: string, userId: string) => {
    const { text } = data;

    const comment = { user: userId, text };

    await checkReqAccess(reqId, userId);

    await validate.addComment(comment);

    const updatedReq: ReqAttributes | null = await Req.findByIdAndUpdate(
        reqId,
        { $push: { comments: comment } },
        { new: true }
    ).populate([history, comments]);

    if (!updateReq) return throwError('Req not found');

    return updatedReq;
}


export const editComment = async (data: EditComment, commentID: string, userId: string) => {
    const { text } = data;

    await checkCommentAccess(commentID, userId);

    await validate.editComment(data);

    const updatedReq: ReqAttributes | null = await Req.findOneAndUpdate({ "comments._id": commentID },
        { "$set": { "comments.$.text": text, "comments.$.edited": true } }, { new: true })
        .populate([history, comments]);

    if (!updatedReq) return throwError('Req not found');

    return updatedReq;
}


export const deleteComment = async (commentID: string, userId: string) => {
    await checkCommentAccess(commentID, userId);

    const updatedReq: ReqAttributes | null = await Req.findOneAndUpdate({ "comments._id": commentID },
        { "$set": { "comments.$.deleted": new Date(), "comments.$.edit": true } }, { new: true })
        .populate([history, comments]);

    if (!updatedReq) return throwError('Req not found');

    return updatedReq;
}