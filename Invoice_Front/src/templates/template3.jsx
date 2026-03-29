import React from 'react';
import { User, Calendar, CreditCard, Package, Building2, Phone } from 'lucide-react';

export default function InvoiceTemplate3({ data }) {

  const {
    companyName,
    companyAddress,
    companyPhone,
    companyLogo,
    invoiceNumber,
    invoiceDate,
    invoicedueDate,
    billingName,
    billingAddress,
    billingPhone,
    items = [],
    currencySymbol,
    tax,
    subtotal,
    taxamount,
    total,
    notes
  } = data;

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return `${currencySymbol}${num.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
        <div className="row g-0">

          {/* LEFT PANEL */}
          <div
            className="col-md-4 text-white p-4 d-flex flex-column"
            style={{
              background: "linear-gradient(135deg, #6366f1, #9333ea)"
            }}
          >
            {/* Logo */}
            <div className="mb-4">
              {companyLogo ? (
                <img src={companyLogo} alt="logo" style={{ width: 60 }} />
              ) : (
                <Building2 size={40} />
              )}
            </div>

            <h4 className="fw-bold">{companyName || "Your Company"}</h4>
            <small className="opacity-75">{companyAddress}</small>

            {/* Client Info */}
            <div className="mt-4 flex-grow-1">
              <p><User size={14}/> {billingName}</p>
              <p><Phone size={14}/> {billingPhone}</p>
              <p><Calendar size={14}/> {invoiceDate}</p>
              <p><CreditCard size={14}/> Due: {invoicedueDate}</p>
            </div>

            {/* Total */}
            <div className="mt-auto pt-3 border-top">
              <h3 className="fw-bold">{formatCurrency(total)}</h3>
              <small>Total Amount</small>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-8 p-5">

            {/* Header */}
            <div className="d-flex justify-content-between mb-4">
              <h4 className="fw-bold">Invoice #{invoiceNumber}</h4>
              <span className="badge bg-warning text-dark">Pending</span>
            </div>

            {/* BILL TO */}
            <div className="mb-4">
              <small className="text-muted">BILL TO</small>
              <h6 className="fw-bold">{billingName}</h6>
              <p className="text-muted mb-0">{billingAddress}</p>
            </div>

            {/* ITEMS */}
            <div className="mb-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                >
                  <div>
                    <p className="mb-0 fw-semibold">{item.name}</p>
                    {item.description && (
                      <small className="text-muted">{item.description}</small>
                    )}
                    <small className="d-block text-muted">
                      Qty: {item.quantity} × {formatCurrency(item.amount)}
                    </small>
                  </div>

                  {/* ✅ FIXED */}
                  <div className="fw-bold">
                    {formatCurrency(item.total)}
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax ({tax}%)</span>
                <span>{formatCurrency(taxamount)}</span>
              </div>

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* NOTES */}
            {notes && (
              <div className="mt-4">
                <small className="text-muted">Notes</small>
                <p>{notes}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}