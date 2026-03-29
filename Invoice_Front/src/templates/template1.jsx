import React from 'react';
import { Building2, Calendar } from 'lucide-react';

export default function Template1({ data }) {
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
    <div
      className="card border-0 shadow-lg w-60"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="card-body p-5 text-white">

        {/* Header */}
        <div className="row mb-5">
          <div className="col-6">
            <h1 className="display-5 fw-bold">INVOICE</h1>
            <p className="mb-0">{invoiceNumber}</p>
          </div>

          <div className="col-6 text-end">
            {companyLogo ? (
              <img src={companyLogo} alt="logo" style={{ width: '80px' }} />
            ) : (
              <div className="bg-white text-dark p-2 rounded d-inline-block">
                <Building2 size={40} />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="row mb-5">

          <div className="col-md-4">
            <small className="text-white-50">FROM</small>
            <p className="fw-bold mb-0">{companyName}</p>
            <small>{companyPhone}</small>
            <div>{companyAddress}</div>
          </div>

          <div className="col-md-4">
            <small className="text-white-50">BILL TO</small>
            <p className="fw-bold mb-0">{billingName}</p>
            <small>{billingPhone}</small>
            <div>{billingAddress}</div>
          </div>

          <div className="col-md-4 text-md-end">
            <small className="text-white-50">INVOICE DATE</small>
            <p className="fw-bold mb-1">{invoiceDate}</p>

            <small className="text-white-50">DUE DATE</small>
            <p className="fw-bold">{invoicedueDate}</p>
          </div>

        </div>

        {/* Table */}
        <div className="table-responsive bg-white rounded-3 p-4 text-dark">
          <table className="table table-borderless">
            <thead className="border-bottom">
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
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
                    <td>{item.quantity}</td>
                    <td>{currencySymbol}{item.amount}</td>
                    <td>{currencySymbol}{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No items added
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="row mt-4">
            <div className="col-md-6 offset-md-6">
              <div className="border-top pt-3">

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">
                    {currencySymbol}{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax ({tax}%):</span>
                  <span>{currencySymbol}{taxamount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    {currencySymbol}{total.toFixed(2)}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-4">
            <small className="text-white-50">Notes:</small>
            <p className="text-white mb-0">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-white-50">
          <small>
            Payment due within 30 days • Thank you for your business!
          </small>
        </div>

      </div>
    </div>
  );
}