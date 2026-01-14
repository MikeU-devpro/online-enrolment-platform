package com.team48.inscriptionscolaire.enrollment;

import lombok.Data;

@Data
public class ContactDetailsDto {
    private String email;
    private String phoneNumber;
    private String address;
    private String peopleToContact;
}
