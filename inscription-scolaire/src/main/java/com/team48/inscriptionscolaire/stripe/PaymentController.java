package com.team48.inscriptionscolaire.stripe;

import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Creates a Stripe checkout session.
     * @param requestDto DTO containing payment details like amount and enrollmentId.
     * @return A DTO with the Stripe session ID, or an error status.
     */
    @PostMapping("/create-checkout-session")
    public ResponseEntity<PaymentResponseDto> createCheckoutSession(@RequestBody PaymentRequestDto requestDto) {
        try {
            PaymentResponseDto response = paymentService.createStripeSession(requestDto);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            // It's a good practice to log the exception
            // log.error("StripeException in createCheckoutSession: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Or return an error DTO
        }
    }

    /**
     * Endpoint for successful payment redirection.
     * In a real app, this would be a frontend route.
     */
    @GetMapping("/success")
    public String getSuccess(){
        return "payment successful";
    }

    /**
     * Endpoint for canceled payment redirection.
     * In a real app, this would be a frontend route.
     */
    @GetMapping("/cancel")
    public String getCancel(){
        return "payment canceled";
    }
}