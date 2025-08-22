package com.team48.inscriptionscolaire.notification;

import com.team48.inscriptionscolaire.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public void createNotification(User recipient, String subject, String message, Integer referenceId) {
        var notification = Notification.builder()
                .user(recipient)
                .subject(subject)
                .message(message)
                .sendDate(LocalDateTime.now())
                .isRead(false)
                .referenceId(referenceId)
                .build();
        notificationRepository.save(notification);
    }

    public List<Notification> getUnreadNotificationsByUserId(Integer userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId);
    }

    public void markAsRead(Integer notificationId) {
        notificationRepository.findById(notificationId)
                .ifPresent(notification -> {
                    notification.setRead(true);
                    notificationRepository.save(notification);
                });
    }

    public long getUnreadNotificationCount(Integer userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
}