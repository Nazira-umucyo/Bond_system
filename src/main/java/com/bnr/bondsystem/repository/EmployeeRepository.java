package com.bnr.bondsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<com.bnr.bondsystem.entity.Employee, Long>{

}
