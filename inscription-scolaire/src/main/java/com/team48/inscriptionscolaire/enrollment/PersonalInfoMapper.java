package com.team48.inscriptionscolaire.enrollment;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonalInfoMapper {
    PersonalInfo toEntity(PersonalInfoDto dto);
    PersonalInfoDto toDto(PersonalInfo entity);
}