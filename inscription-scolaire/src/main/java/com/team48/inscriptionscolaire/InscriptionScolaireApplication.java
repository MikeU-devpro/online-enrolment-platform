package com.team48.inscriptionscolaire;

import com.team48.inscriptionscolaire.program.Program;
import com.team48.inscriptionscolaire.program.ProgramRepository;
import com.team48.inscriptionscolaire.role.Role;
import com.team48.inscriptionscolaire.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class InscriptionScolaireApplication {

    public static void main(String[] args) {
        SpringApplication.run(InscriptionScolaireApplication.class, args);
    }

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("STUDENT").isEmpty()) {
                roleRepository.save(Role.builder().name("STUDENT").build());
            }
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                roleRepository.save(Role.builder().name("ADMIN").build());
            }
        };
    }

    @Bean
    CommandLineRunner initPrograms(ProgramRepository programRepository) {
        return args -> {
            if (programRepository.count() == 0) {
                // 1. Histoire
                Program histoire = Program.builder()
                        .programName("Histoire")
                        .programCode("HIST-101")
                        .description("Étude des événements passés et de leur impact sur le présent")
                        .registrationFee(150000)
                        .maxCapacity(100)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                // 2. Mathématiques
                Program maths = Program.builder()
                        .programName("Mathématiques")
                        .programCode("MATH-201")
                        .description("Algèbre, géométrie et analyse mathématique")
                        .registrationFee(200000)
                        .maxCapacity(80)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                // 3. Python
                Program python = Program.builder()
                        .programName("Python Programming Language")
                        .programCode("PYTH-301")
                        .description("Apprentissage du langage Python et de ses applications")
                        .registrationFee(250000)
                        .maxCapacity(60)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                // 4. Vibe Coding
                Program vibe = Program.builder()
                        .programName("Vibe Coding")
                        .programCode("VIBE-401")
                        .description("Programmation créative et développement intuitif")
                        .registrationFee(180000)
                        .maxCapacity(40)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                // 5. Master Java Spring Boot
                Program java = Program.builder()
                        .programName("Master Java Spring Boot")
                        .programCode("JAVA-501")
                        .description("Maîtrise du framework Spring Boot pour le développement backend")
                        .registrationFee(300000)
                        .maxCapacity(50)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                // 6. Physique
                Program physique = Program.builder()
                        .programName("Physique")
                        .programCode("PHYS-601")
                        .description("Étude des lois fondamentales de l'univers")
                        .registrationFee(175000)
                        .maxCapacity(70)
                        .registrationStartDate(LocalDate.now())
                        .registrationEndDate(LocalDate.now().plusMonths(3))
                        .build();

                programRepository.saveAll(List.of(histoire, maths, python, vibe, java, physique));
                System.out.println("Init 6 Program");
            }
        };
    }
}