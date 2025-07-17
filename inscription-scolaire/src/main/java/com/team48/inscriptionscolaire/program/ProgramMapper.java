package com.team48.inscriptionscolaire.program;


public class ProgramMapper {

    public static Program toEntity(ProgramRequestDTO dto) {
        return Program.builder()
                .programName(dto.getProgramName())
                .programCode(dto.getProgramCode())
                .description(dto.getDescription())
                .registrationFee(dto.getRegistrationFee())
                .maxCapacity(dto.getMaxCapacity())
                .registrationStartDate(dto.getRegistrationStartDate())
                .registrationEndDate(dto.getRegistrationEndDate())
                .build();
    }

    public static ProgramResponseDTO toDto(Program program) {
        ProgramResponseDTO dto = new ProgramResponseDTO();
        dto.setId(program.getId());
        dto.setProgramName(program.getProgramName());
        dto.setProgramCode(program.getProgramCode());
        dto.setDescription(program.getDescription());
        dto.setRegistrationFee(program.getRegistrationFee());
        dto.setMaxCapacity(program.getMaxCapacity());
        dto.setRegistrationStartDate(program.getRegistrationStartDate());
        dto.setRegistrationEndDate(program.getRegistrationEndDate());
        return dto;
    }
}
