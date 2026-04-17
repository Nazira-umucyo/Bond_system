package com.bnr.bondsystem.repository;

import com.bnr.bondsystem.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Long>{
}
