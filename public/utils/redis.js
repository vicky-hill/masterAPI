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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectClient = connectClient;
exports.getValue = getValue;
exports.setValue = setValue;
exports.updateValue = updateValue;
exports.deleteValue = deleteValue;
exports.flushAll = flushAll;
const redis_1 = require("redis");
const constants_1 = require("./constants");
const client = (0, redis_1.createClient)({
    url: "redis://redis-16514.c331.us-west1-1.gce.redns.redis-cloud.com:16514",
    socket: {
        reconnectStrategy: (retries) => {
            console.log('Redis reconnect attempt:', retries);
            return Math.min(retries * 50, 1000);
        }
    }
});
client.on('error', err => console.log('Redis Client Error', err));
function connectClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen) {
            yield client.connect().catch(err => {
                console.error('Redis connection error:', err);
            });
        }
    });
}
client.on("error", (err) => {
    console.error("Redis Error:", err);
});
client.on("connect", () => {
    console.log("Redis connected successfully");
});
client.on("ready", () => {
    console.log("Redis client ready");
});
const getCacheKey = (cacheType, { id, value }) => {
    if (!id && !value)
        return null;
    if (cacheType === 'feature:featureId')
        return value ? `feature:${value.featureId}` : `feature:${id}`;
    if (cacheType === 'features:projectId')
        return value ? `features:projectId:${value.projectId}` : `feature:${id}`;
    if (cacheType === 'project:projectId')
        return value ? `project:${value.projectId}` : `project:${id}`;
    if (cacheType === 'req:reqId')
        return value ? `req:${value.reqId}` : `project:${id}`;
    if (cacheType === 'team:members:teamId')
        return value ? `team:members:${value.teamId}` : `team:members:${id}`;
};
function pullFromCache(key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        try {
            yield connectClient();
            const reply = yield client.get(key);
            return reply ? JSON.parse(reply) : null;
        }
        catch (err) {
            console.error('Error pulling from cache:', err);
            return null;
        }
    });
}
function getValue(cacheType, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        const key = getCacheKey(cacheType, { id });
        if (!key)
            return;
        yield connectClient();
        const res = yield pullFromCache(key);
        return res;
    });
}
function setValue(cacheType, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        const key = getCacheKey(cacheType, { value });
        if (!key)
            return;
        yield connectClient();
        const stringifiedValue = JSON.stringify(value);
        yield client.set(key, stringifiedValue);
    });
}
function updateValue(cacheType, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        const key = getCacheKey(cacheType, { value });
        if (!key)
            return;
        yield connectClient();
        yield setValue(cacheType, value);
    });
}
function deleteValue(cacheType, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        const key = getCacheKey(cacheType, { id });
        if (!key)
            return;
        yield connectClient();
        yield client.del(key);
    });
}
function flushAll() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!constants_1.REDIS)
            return;
        try {
            yield connectClient();
            yield client.flushAll();
        }
        catch (err) {
            console.error("Error flushing all:", err);
        }
    });
}
exports.default = client;
