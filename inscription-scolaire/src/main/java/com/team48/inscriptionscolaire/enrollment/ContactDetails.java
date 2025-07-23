package com.team48.inscriptionscolaire.enrollment;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class ContactDetails {
    private String email;
    private String phoneNumber;
    private String address;
    private String peopleToContact;
}
