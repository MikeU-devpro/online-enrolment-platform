package com.team48.inscriptionscolaire.enrollment;

import com.team48.inscriptionscolaire.common.BaseEntity;
import com.team48.inscriptionscolaire.document.Document;
import com.team48.inscriptionscolaire.program.Program;
import com.team48.inscriptionscolaire.student.Student;
import com.team48.inscriptionscolaire.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment extends BaseEntity {
    private LocalDateTime submissionDate;
    private StatusSubmission status;
    private LocalDateTime validationDate;

    @ManyToOne
    private Student student;

    @OneToMany(mappedBy = "enrollment")
    private List<Document> documents;

    @ManyToOne
    private Program program;

    //stepProgress
}
