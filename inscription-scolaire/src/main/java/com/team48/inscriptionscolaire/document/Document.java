package com.team48.inscriptionscolaire.document;

import com.team48.inscriptionscolaire.common.BaseEntity;
import com.team48.inscriptionscolaire.enrollment.Enrollment;
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
public class Document extends BaseEntity {

    private DocumentTypeSubmitted documentType;
    private String originalFileName;
    private String storagePath;
    private long fileSize;
    private ValidationStatus validationStatus;
    private String rejectionReason;
    private LocalDateTime uploadDate;
    private LocalDateTime validationDate;

    @ManyToOne
    private Enrollment enrollment;
}
