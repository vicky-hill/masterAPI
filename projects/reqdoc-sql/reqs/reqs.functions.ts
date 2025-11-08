import ReqModel from './reqs.model'

export const getReqs = async () => {
    const reqInstances = await ReqModel.findAll({
        where: {} 
    });

    const reqs = reqInstances.map((reqInstance) => {
        const req = reqInstance.get({ plain: true });
        return { ...req };
    })

    return reqs;
}

export const getReq = async (reqId: string): Promise<any> => {
    const reqInstance = await ReqModel.findOne({
        where: { reqId }
    });

    if (!reqInstance) throw new Error('Req not found');

    const req = reqInstance.get({ plain: true });

    return req;
}

export const createReq = async (data: any) => {
    const req = await ReqModel.create(data);

    return req;
}

export const updateReq = async (data: any, reqId: string) => {
    const req = await ReqModel.update(data,
        { where: { reqId } }
    );

    if (!req) throw new Error('Req not found');

    return req;
}

export const deleteReq = async (reqId: string) => {
    await ReqModel.destroy({ where: { reqId }});
    return { reqId };
}