import React from 'react';
import { Building2, Phone, MapPin } from 'lucide-react';

export default function InvoiceTemplate4({ data }) {

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
      <div className="card border-0 shadow-lg" style={{
        background: "#111",
        color: "#fff",
        borderRadius: "20px"
      }}>
        <div className="card-body p-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between mb-5">
            <div>
              <h1 style={{ color: "#00ffcc", fontWeight: 800 }}>INVOICE</h1>
              <p className="text-secondary mb-0">#{invoiceNumber}</p>
            </div>

            <div className="text-end">
              {companyLogo ? (
                <img src={companyLogo} style={{ width: 60 }} />
              ) : (
                <Building2 size={40} />
              )}
              <h6 className="mt-2">{companyName}</h6>
            </div>
          </div>

          {/* INFO */}
          <div className="row mb-4">
            <div className="col-md-4">
              <small className="text-secondary">DATE</small>
              <p>{invoiceDate}</p>
            </div>
            <div className="col-md-4">
              <small className="text-secondary">CLIENT</small>
              <p>{billingName}</p>
            </div>
            <div className="col-md-4">
              <small className="text-secondary">DUE</small>
              <p>{invoicedueDate}</p>
            </div>
          </div>

          {/* CLIENT */}
          <div className="mb-4 p-3" style={{ background: "#1e1e1e", borderRadius: "10px" }}>
            <p className="mb-1"><MapPin size={14}/> {billingAddress}</p>
            <p className="mb-0"><Phone size={14}/> {billingPhone}</p>
          </div>

          {/* ITEMS */}
          <div className="mb-4">
            <table className="table table-dark align-middle">
              <thead style={{ borderBottom: "2px solid #00ffcc" }}>
                <tr>
                  <th>Item</th>
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
                        <small className="d-block text-secondary">
                          {item.description}
                        </small>
                      )}
                    </td>

                    {/* ✅ FIXED */}
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">{formatCurrency(item.amount)}</td>
                    <td className="text-end fw-bold text-success">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="p-4" style={{ background: "#1e1e1e", borderRadius: "15px" }}>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax ({tax}%)</span>
                  <span>{formatCurrency(taxamount)}</span>
                </div>

                <div className="d-flex justify-content-between border-top pt-3 fw-bold">
                  <span>Total</span>
                  <span style={{ color: "#00ffcc", fontSize: "1.3rem" }}>
                    {formatCurrency(total)}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* NOTES */}
          {notes && (
            <div className="mt-4">
              <small className="text-secondary">Notes</small>
              <p>{notes}</p>
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-5 text-center text-secondary small">
            Premium Invoice • Thank you for your business 🚀
          </div>

        </div>
      </div>
    </div>
  );
}