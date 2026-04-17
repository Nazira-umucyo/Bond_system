package com.bnr.bondsystem.service;

import com.bnr.bondsystem.entity.Notification;
import org.springframework.stereotype.Service;
import com.bnr.bondsystem.repository.NotificationRepository;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }
    public Notification getNotificationById(long id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }
    public void deleteNotificationById(long id) {
        notificationRepository.deleteById(id);
    }
    public Notification updateNotificationById(long id, Notification updateNotification) {
        Notification existingNotification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        existingNotification.setCreatedAt(updateNotification.getCreatedAt());
        existingNotification.setMessage(updateNotification.getMessage());
        existingNotification.setStatus(updateNotification.getStatus());

        return notificationRepository.save(existingNotification);

    }

}
