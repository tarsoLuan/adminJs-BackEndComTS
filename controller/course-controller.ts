import { Course } from '../models/course.entity';

const getAllCourses = async (req:any, res:any) => {
    try {
        const courses = await Course.findAll();

        res.json(courses)
        
    } catch (error) {
        throw error;
    }
}

export default getAllCourses;
