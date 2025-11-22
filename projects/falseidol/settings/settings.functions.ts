import { Setting } from '../../../types/falseidol/attribute.types'
import SettingModel from './settings.model'

export const getSettings = async () => {
    const settingInstances = await SettingModel.findAll({
        where: {} 
    });

    const settings = settingInstances.map((settingInstance) => {
        const setting = settingInstance.get({ plain: true });
        return { ...setting };
    })

    return settings;
}

export const updateSetting = async (data: Setting, settingId: string) => {
    const setting = await SettingModel.update(data,
        { where: { settingId } }
    );

    if (!setting) throw new Error('Setting not found');

    return setting;
}