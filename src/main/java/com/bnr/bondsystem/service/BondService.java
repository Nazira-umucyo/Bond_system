package com.bnr.bondsystem.service;

import com.bnr.bondsystem.entity.Bond;
import com.bnr.bondsystem.entity.Employee;
import com.bnr.bondsystem.repository.BondRepository;
import com.bnr.bondsystem.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BondService {

    private final BondRepository bondRepository;
    private final EmployeeRepository employeeRepository;

    public BondService(BondRepository bondRepository, EmployeeRepository employeeRepository) {
        this.bondRepository = bondRepository;
        this.employeeRepository = employeeRepository;
    }

    public Bond save(Bond bond) {
        System.out.println("STAFF ID RECEIVED: " + bond.getStaffId());
        System.out.println("SAVE COST: " + bond.getCost());

        // Just save the exact bond the controller handed you!
        return bondRepository.save(bond);
    }

    // THE FIX: Changed from getEmployeeName (String) to fetchEmployee (Object)
    public Employee fetchEmployee(String staffId) {
        try {
            if (staffId == null || staffId.isEmpty()) {
                return null;
            }

            Long id = Long.parseLong(staffId);
            return employeeRepository.findById(id).orElse(null);

        } catch (Exception e) {
            System.out.println("Error fetching employee: " + e.getMessage());
            return null;
        }
    }

    public List<Bond> getAllBonds() {
        // Because of @ManyToOne, Hibernate automatically loads the Employee object for us!
        List<Bond> bonds = bondRepository.findAll();

        for (Bond b : bonds) {
            // We no longer need to manually set the employee name here.
            // Spring Boot already bundled the entire Employee object into the Bond!
            if (b.getCost() == null) {
                b.setCost(0.0);
            }
        }

        return bonds;
    }

    public Bond getBondById(long id) {
        return bondRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bond not found"));
    }

    public void deleteBondById(long id) {
        bondRepository.deleteById(id);
    }

    public Bond updateBond(long id, Bond updatedBond) {
        Bond existingBond = bondRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bond not found"));

        existingBond.setTraining(updatedBond.getTraining());
        existingBond.setCost(updatedBond.getCost());
        existingBond.setDuration(updatedBond.getDuration());
        existingBond.setStartDate(updatedBond.getStartDate());
        existingBond.setStatus(updatedBond.getStatus());
        existingBond.setStaffId(updatedBond.getStaffId());

        // THE FIX: Pass the Employee object during updates too
        existingBond.setEmployee(fetchEmployee(updatedBond.getStaffId()));

        existingBond.setDocumentName(updatedBond.getDocumentName());
        existingBond.setExposure(updatedBond.getExposure());

        return bondRepository.save(existingBond);
    }

    public Bond updateStatus(Long id, String status) {
        Bond bond = bondRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bond not found"));

        bond.setStatus(status);
        if ("BREACHED".equals(status)) {
            System.out.println("BREACH TRIGGERED");
            bond.setExposure(calculateExposure(bond));
        }
        if ("ACTIVE".equals(status)) {
            bond.setExposure(0.0);
        }

        return bondRepository.save(bond);
    }

    public double calculateExposure(Bond bond) {

        if (bond.getStartDate() == null) {
            return 0;
        }

        int totalYears = bond.getDuration();

        if (totalYears <= 0) return bond.getCost(); // safety

        LocalDate start = bond.getStartDate();
        LocalDate now = LocalDate.now();

        long yearsPassed = ChronoUnit.YEARS.between(start, now);

        int remainingYears = (int) (totalYears - yearsPassed);

        if (remainingYears < 0) remainingYears = 0;

        return ((double) remainingYears / totalYears) * bond.getCost();
    }
}