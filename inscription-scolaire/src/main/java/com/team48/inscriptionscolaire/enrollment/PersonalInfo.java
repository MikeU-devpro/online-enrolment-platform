package com.team48.inscriptionscolaire.enrollment;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PersonalInfo {
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    // other personal fields
}