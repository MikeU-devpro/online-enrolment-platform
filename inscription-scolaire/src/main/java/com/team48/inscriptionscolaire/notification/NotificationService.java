package com.team48.inscriptionscolaire.notification;


import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendGlobalNotification() {
        Notification notification = new Notification("This is a global notification!");
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }

    public void sendPrivateNotification(final String userId) {
        Notification notification = new Notification("This is a private notification for user " + userId);
        messagingTemplate.convertAndSendToUser(userId, "/topic/private-notifications", notification);
    }
}
