package com.example.InvoiceGenerater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
@EnableMongoAuditing
public class InvoiceGeneratorApplication implements CommandLineRunner {

	@Autowired
	private MongoTemplate mongoTemplate;

	public static void main(String[] args) {
		SpringApplication.run(InvoiceGeneratorApplication.class, args);
	}

	@Override
	public void run(String... args) {
		String actualDbName = mongoTemplate.getDb().getName();
		System.out.println("==========================================");
		System.out.println("SUCCESSFULLY CONNECTED TO:");
		System.out.println("Database: " + actualDbName);
		System.out.println("==========================================");

		// Optional: Create a test collection to verify
		mongoTemplate.createCollection("test_connection");
		System.out.println(" Test collection 'test_connection' created in " + actualDbName);
	}
}