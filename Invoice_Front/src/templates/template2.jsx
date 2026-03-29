import React from 'react';
import { Building2, MapPin, Phone, Landmark } from 'lucide-react';

export default function InvoiceTemplate2({ data }) {

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

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0" style={{ borderRadius: "12px" }}>
        <div className="card-body p-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h2 className="fw-bold mb-1">INVOICE</h2>
              <p className="mb-0 text-muted">#{invoiceNumber}</p>
              <small className="text-muted">
                {invoiceDate} | Due: {invoicedueDate}
              </small>
            </div>

            <div className="text-end">
              {companyLogo ? (
                <img src={companyLogo} alt="logo" style={{ width: 80 }} />
              ) : (
                <Building2 size={40} />
              )}
              <h6 className="mt-2 fw-bold">{companyName}</h6>
            </div>
          </div>

          {/* FROM & BILL TO */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="bg-light p-3 rounded">
                <small className="text-muted">FROM</small>
                <p className="fw-bold mb-1">{companyName}</p>
                <p className="mb-1"><MapPin size={14}/> {companyAddress}</p>
                <p className="mb-0"><Phone size={14}/> {companyPhone}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-light p-3 rounded">
                <small className="text-muted">BILL TO</small>
                <p className="fw-bold mb-1">{billingName}</p>
                <p className="mb-1"><MapPin size={14}/> {billingAddress}</p>
                <p className="mb-0"><Phone size={14}/> {billingPhone}</p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="border-bottom">
                <tr>
                  <th>Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
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
                    <td className="text-end">{currencySymbol}{item.amount}</td>
                    <td className="text-end fw-semibold">
                      {currencySymbol}{item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALS */}
          <div className="row mt-4">
            <div className="col-md-6 offset-md-6">
              <div className="border-top pt-3">

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax ({tax}%)</span>
                  <span>{currencySymbol}{taxamount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span className="text-success">
                    {currencySymbol}{total.toFixed(2)}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* NOTES */}
          {notes && (
            <div className="mt-4 border-top pt-3">
              <small className="text-muted">Notes</small>
              <p className="mb-0">{notes}</p>
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-4 text-muted small">
            Thank you for your business 🙏
          </div>

        </div>
      </div>
    </div>
  );
}