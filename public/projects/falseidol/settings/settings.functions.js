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
exports.updateSetting = exports.getSettings = void 0;
const settings_model_1 = __importDefault(require("./settings.model"));
const getSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    const settingInstances = yield settings_model_1.default.findAll({
        where: {}
    });
    const settings = settingInstances.map((settingInstance) => {
        const setting = settingInstance.get({ plain: true });
        return Object.assign({}, setting);
    });
    return settings;
});
exports.getSettings = getSettings;
const updateSetting = (data, settingId) => __awaiter(void 0, void 0, void 0, function* () {
    const setting = yield settings_model_1.default.update(data, { where: { settingId } });
    if (!setting)
        throw new Error('Setting not found');
    return setting;
});
exports.updateSetting = updateSetting;
