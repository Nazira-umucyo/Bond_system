package com.bnr.bondsystem.controller;

import com.bnr.bondsystem.entity.Training;
import com.bnr.bondsystem.service.TrainingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/trainings")

public class TrainingController {
    private final TrainingService trainingService;

    public  TrainingController(TrainingService trainingService)
    {
        this.trainingService = trainingService;
    }
    @GetMapping
    public List<Training> getAllTrainings()
    {
        return trainingService.getAllTrainings();
    }
    @PostMapping
    public Training createTraining(@RequestBody Training training)
    {
        return trainingService.save(training);
    }
    @GetMapping("{id}")
    public Training getTrainingById(@PathVariable long id)
    {
        return trainingService.getTrainingById(id);
    }
    @DeleteMapping("{id}")
    public String deleteTrainingById(@PathVariable long id) {
        trainingService.deleteTrainingById(id);
        return "training has been deleted";
    }
    @PutMapping("{id}")
    public Training updateTraining(@PathVariable long id, @RequestBody Training training) {
        return trainingService.updateTraining(id, training);
    }
}
