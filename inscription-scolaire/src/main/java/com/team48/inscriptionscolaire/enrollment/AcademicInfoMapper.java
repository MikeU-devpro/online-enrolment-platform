package com.team48.inscriptionscolaire.enrollment;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AcademicInfoMapper {
    AcademicInfo toEntity(AcademicInfoDto dto);
    AcademicInfoDto toDto(AcademicInfo entity);
}