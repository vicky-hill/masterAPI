"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchReqs = exports.sortReqs = exports.changeReq = exports.deleteReq = exports.updateReq = exports.createReq = exports.getReqByKey = exports.getReqById = exports.getReqsByFeatureId = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const validation_1 = __importDefault(require("../utils/validation"));
const getReqsByFeatureId = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const feature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
        include: [
            {
                model: models_1.Feature,
                as: 'subFeatures',
                required: false,
                include: [models_1.Req.scope('latest')]
            },
            models_1.Req.scope('latest')
        ]
    });
    yield feature.checkAccess(userId);
    return feature;
});
exports.getReqsByFeatureId = getReqsByFeatureId;
const getReqById = (reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield models_1.Req.scope('full').findByPk(reqId, {
        rejectOnEmpty: new Error('Req not found')
    });
    yield req.checkAccess(userId);
    return req;
});
exports.getReqById = getReqById;
const getReqByKey = (projectKey, reqKey, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findOne({
        rejectOnEmpty: new Error('Req not found'),
        where: { projectKey },
        include: [{
                model: models_1.Req.scope('latest'),
                where: { key: reqKey }
            }]
    });
    yield project.checkAccess(userId);
    if (!project.reqs)
        throw new Error('Reqs not included in project');
    return project.reqs[0];
});
exports.getReqByKey = getReqByKey;
const createReq = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createReq(data);
    const feature = yield models_1.Feature.findByPk(data.featureId, {
        rejectOnEmpty: new Error('Feature not found, cannot create req for non existing feature'),
        include: models_1.Project
    });
    yield feature.checkAccess(userId);
    const featureReqCount = yield models_1.Req.count({
        where: { featureId: feature.featureId, changedReq: null }
    });
    const projectReqCount = yield models_1.Req.count({
        where: { projectId: feature.projectId, changedReq: null }
    });
    if (!feature.project)
        throw new Error('Project not included in feature');
    const projectId = feature.projectId;
    const sort = featureReqCount + 1;
    const key = `${feature.project.reqKey}-${(projectReqCount + 1).toString().padStart(3, '0')}`;
    const { reqId } = yield models_1.Req.create(Object.assign(Object.assign({}, data), { projectId, sort, key }), { fields: ['title', 'text', 'featureId'] });
    const requirement = yield models_1.Req.getReqById(reqId);
    return requirement;
});
exports.createReq = createReq;
const updateReq = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.updateReq(data);
    const req = yield models_1.Req.getReqById(reqId, userId);
    yield req.update(data, { fields: ['title', 'text', 'details'] });
    return req;
});
exports.updateReq = updateReq;
const deleteReq = (reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield models_1.Req.getReqById(reqId, userId);
    yield req.destroy();
    return req;
});
exports.deleteReq = deleteReq;
const changeReq = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.updateReq(data);
    const changedReq = yield models_1.Req.getReqById(reqId, userId);
    const newReq = {
        key: changedReq.key,
        title: changedReq.title,
        text: changedReq.text,
        projectId: changedReq.projectId,
        featureId: changedReq.featureId,
        sort: changedReq.sort
    };
    if (data.title)
        newReq.title = data.title;
    if (data.text)
        newReq.text = data.text;
    const { reqId: newReqId } = yield models_1.Req.create(newReq);
    yield changedReq.update({ changedReq: changedReq.key });
    yield models_1.Req.update({ latestReqId: newReqId }, { where: { key: changedReq.key, changedReq: { [sequelize_1.Op.ne]: null } } });
    const req = yield models_1.Req.getReqById(newReqId);
    return req;
});
exports.changeReq = changeReq;
const sortReqs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.sort(data);
    yield Promise.all(data.map(({ reqId, sort }) => {
        models_1.Req.update({ sort }, { where: { reqId } });
    }));
    return 'sorted';
});
exports.sortReqs = sortReqs;
const searchReqs = (projectId, term, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Project.checkAccess(projectId, userId);
    const allReqs = yield models_1.Req.findAll({
        where: {
            [sequelize_1.Op.and]: [
                {
                    [sequelize_1.Op.or]: [
                        { title: { [sequelize_1.Op.like]: `%${term}%` } },
                        { text: { [sequelize_1.Op.like]: `%${term}%` } }
                    ]
                },
                { projectId }
            ]
        },
        include: models_1.Project
    });
    const reqs = allReqs.filter(req => !req.changedReq);
    const history = allReqs.filter(req => req.changedReq);
    return { reqs, history };
});
exports.searchReqs = searchReqs;
