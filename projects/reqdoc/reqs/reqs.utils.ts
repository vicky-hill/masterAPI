import { ReqAttributes } from '../../../types/reqdoc/attributes.types'

import Req  from './reqs.model'
import throwError from '../../../utils/throwError'
import { history, comments, feature } from '../utils/populate'

export const findReqByID = async function (reqId: string) {
    const requirement: ReqAttributes | null = await Req
        .findById(reqId)
        .populate([history, comments, feature]);

    !requirement && throwError(`Could not find req by ID: ${reqId}`);

    return requirement;
}