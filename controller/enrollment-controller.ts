import { Enrollment } from '../models/enrollments.entity';

const getAllEnrollments = async (req:any, res:any) => {
    try {
        const enrollments = await Enrollment.findAll();

        res.json(enrollments)
        
    } catch (error) {
        throw error;
    }
}

export default getAllEnrollments;

