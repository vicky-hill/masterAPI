import { ReqAttributes } from '../../../types/reqdoc/attributes.types'

import Req  from './reqs.model'
import throwError from '../../../utils/throwError'
import { history, comments } from '../utils/populate'

export const findReqByID = async function (reqID: string) {
    const requirement: ReqAttributes | null = await Req
        .findById(reqID)
        .populate([history, comments]);

    !requirement && throwError(`Could not find req by ID: ${reqID}`);

    return requirement;
}