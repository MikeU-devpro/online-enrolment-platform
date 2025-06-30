package com.team48.inscriptionscolaire;

import com.team48.inscriptionscolaire.role.Role;
import com.team48.inscriptionscolaire.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InscriptionScolaireApplication {

    public static void main(String[] args) {
        SpringApplication.run(InscriptionScolaireApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository){

        return args -> {
            if (roleRepository.findByName("STUDENT").isEmpty()){

                roleRepository.save(
                        Role.builder().name("STUDENT").build()
                );

            }

            if (roleRepository.findByName("ADMIN").isEmpty()){

                roleRepository.save(
                        Role.builder().name("ADMIN").build()
                );

            }
        };
    }

}
