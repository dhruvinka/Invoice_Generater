export const calculateInvoiceTotals = (invoice) => {
    // Ensure items exist
    const items = (invoice?.items || []).map(item => ({
        ...item,
        // Calculate total for each item (quantity × amount)
        total: (parseFloat(item?.quantity) || 0) * (parseFloat(item?.amount) || 0)
    }));
    
    // Calculate subtotal (sum of all item totals)
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    
    // Calculate tax amount
    const taxPercentage = parseFloat(invoice?.tax) || 0;
    const taxAmount = subtotal * taxPercentage / 100;
    
    // Calculate grand total
    const totalAmount = subtotal + taxAmount;
    
    return {
        items,
        subtotal,
        taxAmount,
        totalAmount
    };
};