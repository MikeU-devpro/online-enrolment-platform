package com.team48.inscriptionscolaire;

import com.team48.inscriptionscolaire.program.Program;
import com.team48.inscriptionscolaire.program.ProgramRepository;
import com.team48.inscriptionscolaire.role.Role;
import com.team48.inscriptionscolaire.role.RoleRepository;
import com.team48.inscriptionscolaire.user.User;
import com.team48.inscriptionscolaire.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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

    // --- NOUVEAU BEAN POUR CRÉER L'ADMIN ---
    @Bean
    CommandLineRunner initAdminUser(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "menzepohyvesseraphin@gmail.com";

            // 1. Vérifier si l'admin existe déjà
            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                // 2. Récupérer le rôle ADMIN (qui doit exister grâce au bean précédent)
                Role adminRole = roleRepository.findByName("ADMIN")
                        .orElseThrow(() -> new RuntimeException("Error: ADMIN role not found."));

                // 3. Créer le nouvel utilisateur administrateur
                User adminUser = User.builder()
                        .firstname("Admin")
                        .lastname("User")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("admin12345")) // Mot de passe à changer
                        .role(adminRole) // Utiliser un Set pour les rôles
                        .enabled(true) // <-- ICI ON ACTIVE LE COMPTE DIRECTEMENT
                        .accountLocked(false)
                        .build();

                // 4. Sauvegarder l'admin dans la base de données
                userRepository.save(adminUser);
                System.out.println(">>> Administrateur par défaut créé et activé avec succès !");
            } else {
                System.out.println(">>> L'administrateur par défaut existe déjà.");
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