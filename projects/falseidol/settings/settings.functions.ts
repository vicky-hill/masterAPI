import Log from '../logs/logs.model'
import Setting from './settings.model'

export const getSettings = async () => {
    const settingInstances = await Setting.findAll({
        where: {} 
    });

    const settings = settingInstances.map((settingInstance) => {
        const setting = settingInstance.get({ plain: true });
        return { ...setting };
    })

    await Log.create({
        request: 'getting settings' 
    })

    return settings;
}

export const updateSetting = async (data: Setting, settingId: string) => {
    const setting = await Setting.update(data,
        { where: { settingId } }
    );

    if (!setting) throw new Error('Setting not found');

    return setting;
}