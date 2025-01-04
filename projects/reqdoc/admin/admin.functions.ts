import throwError from '../../../utils/throwError'
import Feature from '../features/features.model'
import Project from '../projects/projects.model'
import Req from '../reqs/reqs.model'

export const deleteFlagged = async (email: string) => {
    if (email !== 'pm@excersys.com') throwError('Not authorized, dev route only');

    await Project.deleteMany({ deleted: true });
    await Req.deleteMany({ deleted: true });
    await Feature.deleteMany({ deleted: true });
}