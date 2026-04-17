package com.bnr.bondsystem.controller;

import com.bnr.bondsystem.service.BondService;
import com.bnr.bondsystem.entity.Employee;
import com.bnr.bondsystem.repository.EmployeeRepository;

import org.springframework.web.bind.annotation.*;
import com.bnr.bondsystem.entity.Bond;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bonds")
public class BondController {

    private final BondService bondService;
    // 2. INJECTED THE EMPLOYEE REPOSITORY
    private final EmployeeRepository employeeRepository;

    public BondController(BondService bondService, EmployeeRepository employeeRepository) {
        this.bondService = bondService;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    public Bond createBond(@RequestBody Bond bond) {
        // 1. Log exactly what React sent us
        System.out.println("==== INCOMING BOND FROM REACT ====");
        System.out.println("StaffId string received: [" + bond.getStaffId() + "]");
        System.out.println("==================================");

        // 2. FAIL FAST: If React forgot the staffId, crash immediately!
        if (bond.getStaffId() == null || bond.getStaffId().trim().isEmpty()) {
            throw new IllegalArgumentException("CRITICAL ERROR: React did not send the 'staffId'! It arrived as null.");
        }

        // 3. Look up the employee
        Employee matchedEmployee = employeeRepository.findByStaffId(bond.getStaffId());

        if (matchedEmployee == null) {
            throw new RuntimeException("CRITICAL ERROR: React sent Staff ID '" + bond.getStaffId() + "', but it does not exist in the employee table.");
        }

        // 4. Attach and save
        bond.setEmployee(matchedEmployee);
        return bondService.save(bond);
    }

    @GetMapping
    public List<Map<String, Object>> getBonds() {
        return bondService.getAllBonds().stream().map(bond -> {
            Map<String, Object> map = new HashMap<>();

            map.put("id", bond.getId());
            map.put("staffId", bond.getStaffId());
            map.put("training", bond.getTraining());
            map.put("duration", bond.getDuration());
            map.put("status", bond.getStatus());
            map.put("cost", bond.getCost());
            map.put("documentName", bond.getDocumentName());

            if (bond.getEmployee() != null) {
                map.put("employeeFullName", bond.getEmployee().getFirstName() + " " + bond.getEmployee().getLastName());
                map.put("employee", bond.getEmployee());
            } else {
                map.put("employeeFullName", "Unknown (" + bond.getStaffId() + ")");
            }
            double exposure = bondService.calculateExposure(bond);
            map.put("exposure", exposure);

            return map;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Bond getBondById(@PathVariable long id) {
        return bondService.getBondById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteBond(@PathVariable long id) {
        bondService.deleteBondById(id);
        return "Bond deleted successfully";
    }
    @PutMapping("/{id}")
    public Bond updateBond(@PathVariable long id, @RequestBody Bond bond) {
        return bondService.updateBond(id,bond);
    }

    @PutMapping("/{id}/status")
    public Bond updateStatus(@PathVariable Long id, @RequestParam String status) {
        return bondService.updateStatus(id, status);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("file is empty");
            }

            System.out.println("Received file: " + file.getOriginalFilename());

            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            String fileName = file.getOriginalFilename();
            String filePath = uploadDir + fileName;

            file.transferTo(new File(filePath));

            return ResponseEntity.ok(fileName);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("upload failed");
        }
    }
}