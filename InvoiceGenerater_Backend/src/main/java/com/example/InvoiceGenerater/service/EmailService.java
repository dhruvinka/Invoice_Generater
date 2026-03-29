package com.example.InvoiceGenerater.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")
    private  String fromEmail ;

    private final JavaMailSender mailSender;

    public void setInvoiceEmail(String toEmail, MultipartFile file) throws MessagingException, IOException
    {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message,true);

        helper.setFrom("kdhruvin4@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("Invoice from Invoice Generator");
        helper.setText("Dear customer, \n\n Please find attached your invoice. \n\n Thank you");

        helper.addAttachment(file.getOriginalFilename(),new ByteArrayResource(file.getBytes()));
        mailSender.send(message);
    }
}
