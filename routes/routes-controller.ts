import express from 'express';
import  getAllUsers  from '../controller/user-controller';
import  getAllCourses  from '../controller/course-controller';
import getAllEnrollments  from '../controller/enrollment-controller';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/courses', getAllCourses);
router.get('/enrollments', getAllEnrollments);

module.exports = router;
