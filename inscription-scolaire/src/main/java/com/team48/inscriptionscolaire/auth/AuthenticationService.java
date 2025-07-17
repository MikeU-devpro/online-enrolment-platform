package com.team48.inscriptionscolaire.auth;

import com.team48.inscriptionscolaire.admin.Admin;
import com.team48.inscriptionscolaire.email.EmailService;
import com.team48.inscriptionscolaire.email.EmailTemplateName;
import com.team48.inscriptionscolaire.role.RoleRepository;
import com.team48.inscriptionscolaire.security.JwtService;
import com.team48.inscriptionscolaire.student.Gender;
import com.team48.inscriptionscolaire.student.MaritalStatus;
import com.team48.inscriptionscolaire.student.Student;
import com.team48.inscriptionscolaire.user.Token;
import com.team48.inscriptionscolaire.user.TokenRepository;
import com.team48.inscriptionscolaire.user.User;
import com.team48.inscriptionscolaire.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;

    private final AuthenticationManager authenticationManager;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;
    private final JwtService jwtService;

    public void register(RegistrationRequest request) throws MessagingException {
        if (!List.of("STUDENT", "ADMIN").contains(request.getRoleName())) {
            throw new IllegalArgumentException("Invalid role specified");
        }

        var userRole = roleRepository.findByName(request.getRoleName())
                .orElseThrow(() -> new IllegalStateException("ROLE " + request.getRoleName() + " was not initialized"));

        User user;

        if ("STUDENT".equals(request.getRoleName())) {
            user = Student.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .accountLocked(false)
                    .enabled(false)
                    .role(userRole)
                    .dateOfBirth(LocalDate.now()) // Valeur par défaut, à mettre à jour plus tard
                    .address("Tradex Emana") // Valeur par défaut
                    .phoneNumber("+237 69910023") // Valeur par défaut
                    .gender(Gender.FEMININ) // Valeur par défaut
                    .nationality("Cameroonian") // Valeur par défaut
                    .maritalStatus(MaritalStatus.SINGLE) // Valeur par défaut
                    .desiredAcademicYear(LocalDate.now().getYear()) // Valeur par défaut
                    .intendedFieldOfStudy("Computer Science") // Valeur par défaut
                    .build();
        } else { // ADMIN
            user = Admin.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .accountLocked(false)
                    .enabled(false)
                    .role(userRole)
                    .internalCode(generateInternalCode())
                    .departement("administration")
                    .build();
        }

        userRepository.save(user);
        sendValidationEmail(user);
    }

    private String generateInternalCode() {
        // Implémentez une logique de génération de code interne
        return "ADM-" + new SecureRandom().nextInt(1000, 9999);
    }
    //it will generate a new token
    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        //send email
        emailService.sendEmail(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        //generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();

        tokenRepository.save(token);
        return generatedToken;

    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++){
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));

        }

        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()

                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());
        claims.put("fullname", user.fullName());
        var jwtToken = jwtService.generateToken(claims,user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    //@Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken= tokenRepository.findByToken(token)
                //to do exception has to be defined
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        //validate the token
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);

    }
}
