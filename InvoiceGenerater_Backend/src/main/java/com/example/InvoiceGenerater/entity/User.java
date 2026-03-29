package com.example.InvoiceGenerater.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "user")
public class User {

    @Id
    private String id;
    private String clerkId;
    private String email;
    private String firstname;
    private String lastname;

    private String photoUrl;
    @CreatedDate
    private Instant createdAt;

}
