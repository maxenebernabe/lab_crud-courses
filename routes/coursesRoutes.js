const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/coursesController');

router.get('/', ctrl.getCourses); 
router.get('/:id', ctrl.getCourseById); 
router.post('/', ctrl.createCourses); 
router.put('/:id', ctrl.updateCourses); 
router.delete('/:id', ctrl.deleteCourses); 

module.exports = router;
