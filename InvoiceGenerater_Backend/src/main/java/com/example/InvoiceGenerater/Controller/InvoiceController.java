package com.example.InvoiceGenerater.Controller;

import com.example.InvoiceGenerater.entity.Invoice;
import com.example.InvoiceGenerater.service.EmailService;
import com.example.InvoiceGenerater.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/invoice")
public class InvoiceController {

    private  final InvoiceService invoiceService;
    private  final EmailService emailService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice, Authentication authentication)
    {
      return  ResponseEntity.ok(invoiceService.saveInvoice(invoice, authentication.getName()));
    }

    @GetMapping
    public  ResponseEntity<List<Invoice>> fetchInvoice(Authentication authentication)
    {
       return  ResponseEntity.ok(invoiceService.fetchAllInvoice(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Void> removeInvoice(@PathVariable String id,Authentication authentication)
    {
        if (authentication.getName() != null) {
            invoiceService.removeInvoice(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }

        throw   new ResponseStatusException(HttpStatus.FORBIDDEN,"User not authorized to delete this invoice");
    }

    @PostMapping("/sendInvoice")
    public ResponseEntity<?> sendInvoice(@RequestPart("file")MultipartFile file,
                                         @RequestPart("email") String Email)
    {

        try{
            emailService.setInvoiceEmail(Email,file);
            return  ResponseEntity.ok().body("Invoice sent successfully");
        } catch (Exception e) {
            e.printStackTrace(); // 🔥 MUST
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }



    }


}
