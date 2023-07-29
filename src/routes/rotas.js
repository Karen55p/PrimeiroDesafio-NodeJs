const { Router } = require('express');
const { tutorController } = require('../controllers/tutor');

const tutorRouter = Router();

tutorRouter.get('/tutors', tutorController.getTutor);
tutorRouter.post('/tutor', tutorController.createTutor);
tutorRouter.put('/tutor/:id', tutorController.updateTutor);
tutorRouter.delete('/tutor/:id', tutorController.deleteTutor);

tutorRouter.post('/pet/:tutorId', tutorController.createPet);
tutorRouter.put('/pet/:petId/tutor/:tutorId', tutorController.updatePet);
tutorRouter.delete('/pet/:petId/tutor/:tutorId', tutorController.deletePet);

module.exports = {
    tutorRouter,
};