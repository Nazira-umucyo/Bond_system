package com.bnr.bondsystem.controller;

import com.bnr.bondsystem.entity.Notification;
import com.bnr.bondsystem.service.NotificationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("notifications")

public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @GetMapping
    public List<Notification> getNotifications() {
        return notificationService.getAllNotifications();
    }
    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.save(notification);
    }
    @GetMapping("{id}")
    public Notification getNotification(@PathVariable long id) {
        return notificationService.getNotificationById(id);
    }
    @DeleteMapping("{id}")
    public String deleteNotification(@PathVariable long id) {
        notificationService.deleteNotificationById(id);
        return "Notification has been deleted";
    }
    @PutMapping("{id}")
    public Notification updateNotification(@PathVariable long id, @RequestBody Notification notification) {
    return notificationService.updateNotificationById(id, notification);
    }
}
