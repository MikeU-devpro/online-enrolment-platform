package com.team48.inscriptionscolaire.program;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProgramResponseDTO {
    private Integer id;
    private String programName;
    private String programCode;
    private String description;
    private double registrationFee;
    private int maxCapacity;
    private LocalDate registrationStartDate;
    private LocalDate registrationEndDate;
}
