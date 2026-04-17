package com.bnr.bondsystem.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trainings")

public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String trainingName;
    private String  provider;
    private double trainingCost;
    private LocalDateTime starDate;
    private LocalDateTime endDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTrainingName() {
        return trainingName;
    }

    public void setTrainingName(String trainingName) {
        this.trainingName = trainingName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public double getTrainingCost() {
        return trainingCost;
    }

    public void setTrainingCost(double trainingCost) {
        this.trainingCost = trainingCost;
    }

    public LocalDateTime getStarDate() {
        return starDate;
    }

    public void setStarDate(LocalDateTime starDate) {
        this.starDate = starDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}
