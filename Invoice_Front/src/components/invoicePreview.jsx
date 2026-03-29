import React, { forwardRef } from 'react';
import { formateInvoiceData } from '../util/FormateInvoiceData';
import InvoiceTemplate1 from '../templates/template1';
import InvoiceTemplate2 from '../templates/template2';
import InvoiceTemplate3 from '../templates/template3';
import InvoiceTemplate4 from '../templates/template4';
import InvoiceTemplate5 from '../templates/template5';
import { templateComponents } from '../util/invoiceTemplate';
const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
 const formatedData = formateInvoiceData(invoiceData);
 console.log(invoiceData)
 console.log(formatedData)

 const Selectedtemplate=templateComponents[template] || templateComponents["template1"];
 
    return (
    <div
      className="invoice-preview container px-2 py-2 overflow-x-auto"
      ref={ref}
    >
      <Selectedtemplate data={formatedData}/>
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;