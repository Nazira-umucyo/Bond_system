package com.bnr.bondsystem.service;

import com.bnr.bondsystem.entity.Employee;
import com.bnr.bondsystem.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    public Employee getEmployeeById(long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
    public void deleteEmployeeById(long id) {
        employeeRepository.deleteById(id);
    }
    public Employee updateEmployee(long id , Employee updateEmployee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        existingEmployee.setFirstName(updateEmployee.getFirstName());
        existingEmployee.setLastName(updateEmployee.getLastName());
        existingEmployee.setEmail(updateEmployee.getEmail());
        existingEmployee.setDepartment(updateEmployee.getDepartment());
        existingEmployee.setPosition(updateEmployee.getPosition());
        existingEmployee.setDateJoined(updateEmployee.getDateJoined());
        existingEmployee.setStatus(updateEmployee.getStatus());

        return employeeRepository.save(existingEmployee);
    }
}
