package com.bnr.bondsystem.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBreachEmail(String employeeName, double exposure) {
        System.out.println("Sending email to HR...");
        System.out.println("EMAIL METHOD CALLED");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo("umucyonazira8@gmail.com");
            helper.setSubject("🚨 Bond Breach Alert");

            helper.setText(
                    "Hello HR,\n\n" +
                            "A bond has been BREACHED.\n\n" +
                            "Employee: " + employeeName + "\n" +
                            "Exposure Amount: " + exposure + " RWF\n\n" +
                            "Please review and take necessary action.\n\n" +
                            "Regards,\nBond Management System",
                    false
            );

            mailSender.send(message);
            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {
            System.out.println("EMAIL FAILED DURING SEND");
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}