package com.team48.inscriptionscolaire.notification;

import com.team48.inscriptionscolaire.user.User;
import com.team48.inscriptionscolaire.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadNotificationsCount() {
        var user = (User) userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        long count = notificationService.getUnreadNotificationCount(user.getId());
        return ResponseEntity.ok(count);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        var user = (User) userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        List<Notification> notifications = notificationService.getUnreadNotificationsByUserId(user.getId());
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/mark-as-read/{notificationId}")
    public ResponseEntity<Void> markAsRead(@PathVariable Integer notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
}