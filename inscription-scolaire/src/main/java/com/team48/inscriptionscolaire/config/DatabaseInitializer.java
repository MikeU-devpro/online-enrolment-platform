package com.team48.inscriptionscolaire.config;

import com.team48.inscriptionscolaire.program.Program;
import com.team48.inscriptionscolaire.program.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final ProgramRepository programRepository;

    @Override
    public void run(String... args) throws Exception {
        if (programRepository.count() == 0) {
            System.out.println("Populating database with initial program data...");

            List<Program> programs = List.of(
                    Program.builder()
                            .programName("Génie Logiciel")
                            .programCode("GLOG")
                            .description("Conception et développement d'applications logicielles complexes.")
                            .registrationFee(500.0)
                            .maxCapacity(150)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Science des Données")
                            .programCode("SDAT")
                            .description("Analyse et interprétation de grands ensembles de données pour en extraire des connaissances.")
                            .registrationFee(550.0)
                            .maxCapacity(100)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Cybersécurité")
                            .programCode("CYBS")
                            .description("Protection des systèmes informatiques et des réseaux contre les attaques.")
                            .registrationFee(600.0)
                            .maxCapacity(120)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Intelligence Artificielle")
                            .programCode("IART")
                            .description("Création de machines intelligentes pour imiter les fonctions cognitives humaines.")
                            .registrationFee(650.0)
                            .maxCapacity(90)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Marketing Digital")
                            .programCode("MADI")
                            .description("Stratégies et outils de marketing en ligne pour promouvoir une marque.")
                            .registrationFee(400.0)
                            .maxCapacity(200)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Gestion de Projet")
                            .programCode("GPJT")
                            .description("Planification, exécution et suivi de projets pour atteindre des objectifs précis.")
                            .registrationFee(450.0)
                            .maxCapacity(160)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Design Graphique")
                            .programCode("DGRH")
                            .description("Création de visuels pour la communication et l'esthétique.")
                            .registrationFee(350.0)
                            .maxCapacity(140)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Sciences Biomédicales")
                            .programCode("SBIO")
                            .description("Étude des principes biologiques et chimiques pour la médecine et la santé.")
                            .registrationFee(700.0)
                            .maxCapacity(80)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build(),
                    Program.builder()
                            .programName("Communication Digitale")
                            .programCode("CDIG")
                            .description("Maîtrise des stratégies de communication sur les plateformes numériques.")
                            .registrationFee(420.0)
                            .maxCapacity(180)
                            .registrationStartDate(LocalDate.of(2025, 9, 1))
                            .registrationEndDate(LocalDate.of(2025, 10, 31))
                            .build()
            );

            programRepository.saveAll(programs);

            System.out.println("Database population complete with 9 programs.");
        }
    }
}