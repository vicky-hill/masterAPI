import { Request, Response, NextFunction } from 'express'
import * as Setting from './settings.functions'

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const settings = await Setting.getSettings();
        res.json(settings);
    } catch (err) {
        next(err);
    }
}

export const updateSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { settingId } = req.params;

        const setting = await Setting.updateSetting(req.body, settingId);
        res.json(setting);
    } catch (err) {
        next(err);
    }
}