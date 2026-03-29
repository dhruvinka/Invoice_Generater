import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const initialInvoiceDate = {
  title: 'New Invoice',
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", phone: "", address: "" }, 
  tax: 0,
  notes: "",
  items: [
    {
      name: "",
      qty: 1,              
      amount: "",
      description: "",     
      total: 0
    }
  ],
  logo: ""
};

export const AppContextProvider = ({ children }) => {

  const [invoiceTitle, setinvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState(initialInvoiceDate);
  const [selectedTemplate, setselectedTemplate] = useState('template1');

  const baseURL = "http://localhost:8080/api";

  const contextValue = {
    invoiceTitle, setinvoiceTitle,
    invoiceData, setInvoiceData,
    selectedTemplate, setselectedTemplate,
    initialInvoiceDate,
    baseURL,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};