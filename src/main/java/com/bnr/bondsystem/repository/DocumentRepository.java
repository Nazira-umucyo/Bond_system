package com.bnr.bondsystem.repository;

import com.bnr.bondsystem.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document,Long>{
}

