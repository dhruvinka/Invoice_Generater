import React from 'react';
import { Building2, Download, Send } from 'lucide-react';

export default function InvoiceTemplate5({ data }) {

  const {
    companyName,
    companyAddress,
    companyLogo,
    invoiceNumber,
    invoiceDate,
    invoicedueDate,
    billingName,
    billingAddress,
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
      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="card-body p-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center gap-3">
              {companyLogo ? (
                <img src={companyLogo} style={{ width: 40 }} />
              ) : (
                <Building2 size={30} />
              )}
              <div>
                <h5 className="mb-0">{companyName}</h5>
                <small className="text-muted">{companyAddress}</small>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm">
                <Download size={14}/> PDF
              </button>
              <button className="btn btn-light btn-sm">
                <Send size={14}/> Send
              </button>
            </div>
          </div>

          {/* BILLING */}
          <div className="row mb-5">
            <div className="col-md-6">
              <small className="text-muted">Bill To</small>
              <h6 className="fw-bold">{billingName}</h6>
              <p className="text-muted mb-0">{billingAddress}</p>
            </div>

            <div className="col-md-6 text-md-end">
              <p className="mb-1 text-muted">Invoice #{invoiceNumber}</p>
              <h3 className="fw-bold">{formatCurrency(total)}</h3>
              <small className="text-muted">
                {invoiceDate} • Due {invoicedueDate}
              </small>
            </div>
          </div>

          {/* TABLE */}
          <table className="table align-middle">
            <thead className="border-bottom">
              <tr>
                <th>Description</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>
                    {item.name}
                    {item.description && (
                      <small className="d-block text-muted">
                        {item.description}
                      </small>
                    )}
                  </td>

                  {/* ✅ FIXED */}
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">{formatCurrency(item.amount)}</td>
                  <td className="text-end fw-semibold">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTALS */}
          <div className="d-flex justify-content-end mt-4">
            <div style={{ width: "300px" }}>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax ({tax}%)</span>
                <span>{formatCurrency(taxamount)}</span>
              </div>

              <div className="d-flex justify-content-between border-top pt-2 fw-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

            </div>
          </div>

          {/* NOTES */}
          {notes && (
            <div className="mt-4">
              <small className="text-muted">Notes</small>
              <p className="mb-0">{notes}</p>
            </div>
          )}

          {/* FOOTER */}
          <div className="text-center mt-5 text-muted small">
            Thank you for your business 🙏
          </div>

        </div>
      </div>
    </div>
  );
}