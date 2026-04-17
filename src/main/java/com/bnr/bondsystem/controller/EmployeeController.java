package com.bnr.bondsystem.controller;

import org.springframework.web.bind.annotation.*;

import com.bnr.bondsystem.entity.Employee;
import com.bnr.bondsystem.service.EmployeeService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/employees")

public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
   @GetMapping
   public List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
   }
   @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return  employeeService.save(employee);
   }
   @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable long id) {
        return employeeService.getEmployeeById(id);
   }
   @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable long id) {
        employeeService.deleteEmployeeById(id);
        return "Employee deleted successfully";
   }
   @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id,employee);
   }
}