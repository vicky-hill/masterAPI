import Setting from './settings.model'

export const getSettings = async () => {
    const settings = await Setting.findAll();
    return settings;
}

export const updateSetting = async (data: Setting, settingId: string) => {
    const setting = await Setting.findByPk(settingId, {
        rejectOnEmpty: new Error('Setting not found')
    });

    await setting.update(data);
    
    return setting;
}