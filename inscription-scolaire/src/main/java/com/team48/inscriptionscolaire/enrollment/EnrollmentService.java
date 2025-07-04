package com.team48.inscriptionscolaire.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository repository;

    public void createEnrollment(EnrollmentDtoRequest dtoRequest){

    }

}
