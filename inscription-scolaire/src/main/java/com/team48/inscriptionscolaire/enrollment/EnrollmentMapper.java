package com.team48.inscriptionscolaire.enrollment;

import com.team48.inscriptionscolaire.document.Document;
import com.team48.inscriptionscolaire.program.Program;
import com.team48.inscriptionscolaire.student.Student;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    EnrollmentMapper INSTANCE = Mappers.getMapper(EnrollmentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "IN_PROGRESS")
    @Mapping(target = "createdDate", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "submissionDate", ignore = true)
    @Mapping(target = "validationDate", ignore = true)
    @Mapping(target = "personalInfo", source = "dto.personalInfo")
    @Mapping(target = "academicInfo", source = "dto.academicInfo")
    @Mapping(target = "stepCompleted", source = "dto.currentStep")
    Enrollment toEntity(EnrollmentDtoRequest dto, Student student, Program program);

    @Mapping(target = "programId", source = "program.id")
    @Mapping(target = "programName", source = "program.name")
    @Mapping(target = "currentStep", source = "stepCompleted")
    @Mapping(target = "personalInfo", source = "personalInfo")
    @Mapping(target = "academicInfo", source = "academicInfo")
    @Mapping(target = "documents", source = "documents")
    EnrollmentDtoResponse toDto(Enrollment enrollment);

    PersonalInfo toPersonalInfoEntity(PersonalInfoDto dto);
    AcademicInfo toAcademicInfoEntity(AcademicInfoDto dto);

    PersonalInfoDto toPersonalInfoDto(PersonalInfo entity);
    AcademicInfoDto toAcademicInfoDto(AcademicInfo entity);

    @AfterMapping
    default void setDefaultValues(@MappingTarget Enrollment enrollment) {
        if (enrollment.getStatus() == null) {
            enrollment.setStatus(StatusSubmission.IN_PROGRESS);
        }
        if (enrollment.getCreatedDate() == null) {
            enrollment.setCreatedDate(LocalDateTime.now());
        }
    }
}