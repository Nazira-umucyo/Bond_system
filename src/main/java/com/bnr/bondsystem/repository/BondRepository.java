package com.bnr.bondsystem.repository;

import com.bnr.bondsystem.entity.Bond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BondRepository extends JpaRepository<Bond,Long>{

}
