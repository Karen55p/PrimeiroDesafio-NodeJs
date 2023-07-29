import { Request, Response } from 'express';

interface Pet {
    id: number;
    name: string;
    species: string;
    carry: string;
    weight: number;
    date_of_birth: string;
  }
  
interface Tutor {
    id: number;
    name: string;
    phone: string;
    email: string;
    date_of_birth: string;
    zip_code: string;
    pets: Pet[];
}
  
let tutors: Tutor[] = [];

class TutorController {
    
    getTutor(req: Request, res: Response){
        return res.json(tutors);
    };

    createTutor(req: Request, res: Response){
        const newTutor: Tutor = req.body;
        tutors.push(newTutor);
        return res.status(201).json({ message: 'Novo tutor criado com sucesso!' });
    };

    updateTutor(req: Request, res: Response){
        const tutorId = parseInt(req.params.id, 10);
        const updatedTutor: Tutor = req.body;
      
        const index = tutors.findIndex((tutor) => tutor.id === tutorId);
      
        if (index !== -1) {
          tutors[index] = { ...tutors[index], ...updatedTutor };
          res.json({ message: 'Tutor atualizado com sucesso!' });
        } else {
          res.status(404).json({ error: 'Tutor não encontrado.' });
        }
      };

    deleteTutor(req: Request, res: Response){
        const tutorId = parseInt(req.params.id, 10);
        tutors = tutors.filter((tutor) => tutor.id !== tutorId);
        res.json({ message: 'Tutor deletado com sucesso!' });
    }

    createPet(req: Request, res: Response){
        const tutorId = parseInt(req.params.tutorId, 10);
        const newPet: Pet = req.body;

        const index = tutors.findIndex((tutor) => tutor.id === tutorId);

        if (index !== -1) {
            if (!tutors[index].pets) {
            tutors[index].pets = [];
            }
            tutors[index].pets.push(newPet);
            res.status(201).json({ message: 'Novo pet criado e associado ao tutor com sucesso!' });
        } else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    }

    updatePet(req: Request, res: Response){
        const petId = parseInt(req.params.petId, 10);
        const tutorId = parseInt(req.params.tutorId, 10);
        const updatedPet: Pet = req.body;

        const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);

        if (tutorIndex !== -1) {
            const petIndex = tutors[tutorIndex].pets.findIndex((pet) => pet.id === petId);
            if (petIndex !== -1) {
            tutors[tutorIndex].pets[petIndex] = { ...tutors[tutorIndex].pets[petIndex], ...updatedPet };
            res.json({ message: 'Informações do pet atualizadas com sucesso!' });
            } else {
            res.status(404).json({ error: 'Pet não encontrado.' });
            }
        } else {
            res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    }

    deletePet(req: Request, res: Response){
        const petId = parseInt(req.params.petId, 10);
        const tutorId = parseInt(req.params.tutorId, 10);
      
        const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);
      
        if (tutorIndex !== -1) {
          tutors[tutorIndex].pets = tutors[tutorIndex].pets.filter((pet) => pet.id !== petId);
          res.json({ message: 'Pet deletado do tutor com sucesso!' });
        } else {
          res.status(404).json({ error: 'Tutor não encontrado.' });
        }
    }
}

const tutorController = new TutorController();

module.exports = {
    tutorController,
};