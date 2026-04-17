package com.bnr.bondsystem.repository;

import com.bnr.bondsystem.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // THE FIX: This tells Spring Boot to generate the SQL query to find an employee by their Staff ID string.
    Employee findByStaffId(String staffId);

}