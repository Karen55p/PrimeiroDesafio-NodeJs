"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tutors = [];
var TutorController = /** @class */ (function () {
    function TutorController() {
    }
    TutorController.prototype.getTutor = function (req, res) {
        return res.json(tutors);
    };
    ;
    TutorController.prototype.createTutor = function (req, res) {
        var newTutor = req.body;
        tutors.push(newTutor);
        return res.status(201).json({ message: 'Novo tutor criado com sucesso!' });
    };
    ;
    TutorController.prototype.updateTutor = function (req, res) {
        var tutorId = parseInt(req.params.id, 10);
        var updatedTutor = req.body;
        var index = tutors.findIndex(function (tutor) { return tutor.id === tutorId; });
        if (index !== -1) {
            tutors[index] = __assign(__assign({}, tutors[index]), updatedTutor);
            res.json({ message: 'Tutor atualizado com sucesso!' });
        }
        else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    };
    ;
    TutorController.prototype.deleteTutor = function (req, res) {
        var tutorId = parseInt(req.params.id, 10);
        tutors = tutors.filter(function (tutor) { return tutor.id !== tutorId; });
        res.json({ message: 'Tutor deletado com sucesso!' });
    };
    TutorController.prototype.createPet = function (req, res) {
        var tutorId = parseInt(req.params.tutorId, 10);
        var newPet = req.body;
        var index = tutors.findIndex(function (tutor) { return tutor.id === tutorId; });
        if (index !== -1) {
            if (!tutors[index].pets) {
                tutors[index].pets = [];
            }
            tutors[index].pets.push(newPet);
            res.status(201).json({ message: 'Novo pet criado e associado ao tutor com sucesso!' });
        }
        else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    };
    TutorController.prototype.updatePet = function (req, res) {
        var petId = parseInt(req.params.petId, 10);
        var tutorId = parseInt(req.params.tutorId, 10);
        var updatedPet = req.body;
        var tutorIndex = tutors.findIndex(function (tutor) { return tutor.id === tutorId; });
        if (tutorIndex !== -1) {
            var petIndex = tutors[tutorIndex].pets.findIndex(function (pet) { return pet.id === petId; });
            if (petIndex !== -1) {
                tutors[tutorIndex].pets[petIndex] = __assign(__assign({}, tutors[tutorIndex].pets[petIndex]), updatedPet);
                res.json({ message: 'Informações do pet atualizadas com sucesso!' });
            }
            else {
                res.status(404).json({ error: 'Pet não encontrado.' });
            }
        }
        else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    };
    TutorController.prototype.deletePet = function (req, res) {
        var petId = parseInt(req.params.petId, 10);
        var tutorId = parseInt(req.params.tutorId, 10);
        var tutorIndex = tutors.findIndex(function (tutor) { return tutor.id === tutorId; });
        if (tutorIndex !== -1) {
            tutors[tutorIndex].pets = tutors[tutorIndex].pets.filter(function (pet) { return pet.id !== petId; });
            res.json({ message: 'Pet deletado do tutor com sucesso!' });
        }
        else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    };
    return TutorController;
}());
var tutorController = new TutorController();
module.exports = {
    tutorController: tutorController,
};
