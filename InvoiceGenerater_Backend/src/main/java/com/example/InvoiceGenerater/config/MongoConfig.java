package com.example.InvoiceGenerater.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {

    @Bean
    @Primary
    public MongoClient mongoClient() {
        // Connect to MongoDB without specifying database
        return MongoClients.create("mongodb://localhost:27017");
    }

    @Bean
    @Primary
    public MongoTemplate mongoTemplate() {
        // FORCE the database name to invoice_Generator
        SimpleMongoClientDatabaseFactory factory = new SimpleMongoClientDatabaseFactory(
                mongoClient(),
                "invoice_Generator"  // Your database name
        );
        return new MongoTemplate(factory);
    }
}