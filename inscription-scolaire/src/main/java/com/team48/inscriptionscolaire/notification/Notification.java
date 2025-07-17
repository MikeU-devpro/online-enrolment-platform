package com.team48.inscriptionscolaire.notification;


import com.team48.inscriptionscolaire.common.BaseEntity;
import com.team48.inscriptionscolaire.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends BaseEntity {
    private String subject;
    private String message;
    private LocalDateTime sendDate;
    private boolean isRead;
    private Integer referenceId;
    @ManyToOne
    private User user;
}
