package com.bnr.bondsystem.service;

import com.bnr.bondsystem.entity.Training;
import com.bnr.bondsystem.repository.TrainingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingService {
    private final  TrainingRepository trainingRepository;

    public TrainingService(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }
    public List<Training> getAllTrainings(){
        return trainingRepository.findAll();
    }
    public Training save(Training training){
        return trainingRepository.save(training);
    }
    public Training getTrainingById(long id){
        return trainingRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Training not found"));
    }
    public void deleteTrainingById(long id){
        trainingRepository.deleteById(id);
    }
    public Training updateTraining(Long id, Training updatetraining) {
        Training existingTraining = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found"));

        existingTraining.setTrainingName(updatetraining.getTrainingName());
        existingTraining.setProvider(updatetraining.getProvider());
        existingTraining.setTrainingCost(updatetraining.getTrainingCost());
        existingTraining.setStarDate(updatetraining.getStarDate());
        existingTraining.setEndDate(updatetraining.getEndDate());

        return trainingRepository.save(existingTraining);
    }

}
