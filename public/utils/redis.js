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
exports.deleteValue = deleteValue;
exports.flushAll = flushAll;
exports.updateValue = updateValue;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: "redis://default:uQ9W5y3lfgOph0pa6JTqbkxR88YXXqNg@redis-14878.c11.us-east-1-3.ec2.redns.redis-cloud.com:14878",
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
function pullFromCache(key) {
    return __awaiter(this, void 0, void 0, function* () {
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
function getValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectClient();
            const res = yield pullFromCache(key);
            return res;
        }
        catch (err) {
            console.error('Error getting value:', err);
            return undefined;
        }
    });
}
function setValue(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectClient();
            const stringifiedValue = JSON.stringify(value);
            console.log('value', stringifiedValue);
            yield client.set(key, stringifiedValue);
        }
        catch (err) {
            console.error("Error setting value:", err);
        }
    });
}
function deleteValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectClient();
            yield client.del(key);
        }
        catch (err) {
            console.error("Error deleting value:", err);
        }
    });
}
function flushAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectClient();
            yield client.flushAll();
            return "All redis cache has been flushed.";
        }
        catch (err) {
            console.error("Error flushing all:", err);
            return "Error flushing all.";
        }
    });
}
function updateValue(key, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectClient();
        yield setValue(key, JSON.stringify(newValue));
    });
}
exports.default = client;
