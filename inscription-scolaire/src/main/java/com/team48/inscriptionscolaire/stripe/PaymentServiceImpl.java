package com.team48.inscriptionscolaire.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Override
    public PaymentResponseDto createStripeSession(PaymentRequestDto paymentRequest) throws StripeException {
        // Define the success and cancel URLs
        String successUrl = "http://localhost:5173/payment/success"; // Update to your frontend URL
        String cancelUrl = "http://localhost:5173/payment/cancel";   // Update to your frontend URL

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(paymentRequest.getAmount()) // Use dynamic amount
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Enrollment Fee - ID: " + paymentRequest.getEnrollmentId()) // Use dynamic data
                                                                .build())
                                                .build())
                                .setQuantity(1L)
                                .build())
                .build();

        Session session = Session.create(params);

        return new PaymentResponseDto(session.getId());
    }
}