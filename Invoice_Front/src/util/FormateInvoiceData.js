export const formateInvoiceData = (invoiceData) => {

  const {
    title,
    company = {},
    invoice = {},
    account = {},
    billing = {},
    shipping = {},
    tax = 0,
    notes = "",
    items = [],
    logo = ""
  } = invoiceData || {};

  const currencySymbol = "₹";

  const processedItems = items.map(item => {

  let rawQty = item.qty ?? item.quantity;
  let quantity = parseFloat(rawQty);

  if (rawQty === undefined || rawQty === null || rawQty === '' || isNaN(quantity)) {
    quantity = 1;
  }

  let amount = parseFloat(item.amount ?? item.price);
  if (isNaN(amount)) amount = 0;

  const total = quantity * amount;

  return {
    name: item.name || 'Item',
    description: item.description || '',
    quantity,
    amount,
    total
  };
});

  const subtotal = processedItems.reduce((acc, item) => acc + item.total, 0);

  const taxPercentage = parseFloat(tax) || 0;
  const taxamount = subtotal * (taxPercentage / 100);
  const total = subtotal + taxamount;

  return {
    title: title || 'New Invoice',

    companyName: company?.name || '',
    companyAddress: company?.address || '',
    companyPhone: company?.phone || '',
    companyLogo: logo,

    invoiceNumber: invoice?.number || 'INV-001',
    invoiceDate: invoice?.date || '',
    invoicedueDate: invoice?.dueDate || '',

    billingName: billing?.name || '',
    billingAddress: billing?.address || '',
    billingPhone: billing?.phone || '',

    shippingName: shipping?.name || '',
    shippingAddress: shipping?.address || '',
    shippingPhone: shipping?.phone || '',

    currencySymbol,
    tax: taxPercentage,
    items: processedItems,
    notes: notes || '',

    subtotal,
    taxamount,
    total
  };
};