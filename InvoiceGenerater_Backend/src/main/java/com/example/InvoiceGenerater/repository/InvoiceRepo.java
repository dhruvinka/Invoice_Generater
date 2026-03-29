package com.example.InvoiceGenerater.repository;

import com.example.InvoiceGenerater.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepo extends MongoRepository<Invoice,String> {
//findbyclerk id
    List<Invoice>  findByClerkId(String id);

    Optional<Invoice> findByClerkIdAndId(String clerkId, String invoiceId);

}
