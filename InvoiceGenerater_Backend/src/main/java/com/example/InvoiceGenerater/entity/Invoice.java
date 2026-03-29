package com.example.InvoiceGenerater.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "invoice")
public class Invoice {

    @Id
    private String id;

    private String clerkId;
    private Company company;
    private Billing billing;
    private Shipping shipping;
    private InvoiceDetails invoiceDetails;

    private List<Item> items;

    private String notes;
    private String logo;
    private Double tax;
    private String template;
    private String title;
    private String thumbnailUrl;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant lastUpdatedAt; // ✅ FIXED

    private double totalAmount;

    @Data
    public static class Company {
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class Billing {
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class Shipping {
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class InvoiceDetails {
        private String number;
        private String date;
        private String dueDate;
    }

    @Data
    public static class Item {
        private String description;
        private Integer quantity;
        private Double amount;
        private String name;

        private Double total; // ✅ NEW
    }
}