package com.example.InvoiceGenerater.service;

import com.example.InvoiceGenerater.entity.Invoice;
import com.example.InvoiceGenerater.repository.InvoiceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class InvoiceService {

    private  final InvoiceRepo invoiceRepo;

//    public Invoice saveInvoice(Invoice invoice){
//
//        double subtotal = 0;
//
//        if (invoice.getItems() != null) {
//            for (var item : invoice.getItems()) {
//
//                if (item.getQuantity() == null || item.getQuantity() <= 0) {
//                    item.setQuantity(1);
//                }
//
//                if (item.getAmount() == null) {
//                    item.setAmount(0.0);
//                }
//
//                double itemTotal = item.getQuantity() * item.getAmount();
//                subtotal += itemTotal;
//            }
//        }
//
//        double tax = invoice.getTax() != null ? invoice.getTax() : 0;
//        double taxAmount = subtotal * tax / 100;
//
//        double total = subtotal + taxAmount;
//
//        invoice.setTotalAmount(total);
//
//        return invoiceRepo.save(invoice);
//    }

    public Invoice saveInvoice(Invoice invoice, String clerkId){

        // 🔥 CRITICAL LINE
        invoice.setClerkId(clerkId);

        double subtotal = 0;

        if (invoice.getItems() != null) {
            for (var item : invoice.getItems()) {

                if (item.getQuantity() == null || item.getQuantity() <= 0) {
                    item.setQuantity(1);
                }

                if (item.getAmount() == null) {
                    item.setAmount(0.0);
                }

                double itemTotal = item.getQuantity() * item.getAmount();
                subtotal += itemTotal;
            }
        }

        double tax = invoice.getTax() != null ? invoice.getTax() : 0;
        double taxAmount = subtotal * tax / 100;

        double total = subtotal + taxAmount;

        invoice.setTotalAmount(total);

        return invoiceRepo.save(invoice);
    }
    public List<Invoice> fetchAllInvoice(String clerkId)
    {
        return  invoiceRepo.findByClerkId(clerkId);
    }

//     public Invoice fetchInvoiceById(String id)
//     {
//         return invoiceRepo.findByClerkId(id)
//                 .orElseThrow(()->new RuntimeException("Invoice not found with id: " + id));
//     }


     public void removeInvoice(String invoiceId,String clerkId)
     {
         Invoice existinginvoice=invoiceRepo.findByClerkIdAndId(invoiceId,clerkId)
                 .orElseThrow(()->new RuntimeException("Invoice not found" + invoiceId));
         invoiceRepo.delete(existinginvoice);
     }

}
