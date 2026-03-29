import React, { useContext, useEffect, useState } from 'react'
import { AppContext, initialInvoiceDate } from '../context/AppContext';
import { getAllInvoices } from '../service/invoiceService';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export default function Dashboard() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { baseURL, setinvoiceTitle, setInvoiceData, setselectedTemplate, invoiceData } = useContext(AppContext);
  const navigate = useNavigate();
  const {getToken}=useAuth();
      

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        console.log("TOKEN:", token);
        console.log("hiiiiiiiiiiiiiiiiiiiiii")
        const response = await getAllInvoices(baseURL,token);

        const normalizedInvoices = response.data.map(inv => ({
          ...inv,
          items: (inv.items || []).map(item => ({
            ...item,
            qty: item.quantity ?? 1   // ✅ map backend → frontend
          }))
        }));

        setInvoices(normalizedInvoices);

        console.log(normalizedInvoices)
        setInvoices(normalizedInvoices);

      } catch (error) {
        console.error('Fetch error:', error);
        toast.error("Failed to load the invoices");
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, [baseURL]);

  const handleViewClick = (invoice) => {

    // FIX: Ensure items always have valid quantity
    const normalizedItems = (invoice.items || initialInvoiceDate.items).map(item => ({
      ...item,
      quantity: item.quantity ?? item.qty ?? 1,
    }));

    setInvoiceData({
      ...initialInvoiceDate,
      ...invoice,
      billing: { ...initialInvoiceDate.billing, ...invoice.billing },
      shipping: { ...initialInvoiceDate.shipping, ...invoice.shipping },
      company: { ...initialInvoiceDate.company, ...invoice.company },
      items: normalizedItems,
    });

    setselectedTemplate(invoice.template || "template1");
    setinvoiceTitle(invoice.title || "New Invoice");
    navigate('/preview');
  }

  const handleCreateNew = () => {
    setinvoiceTitle("New Invoice")
    setselectedTemplate("template1");
    setInvoiceData(initialInvoiceDate)
    navigate('/generate');
  }

  const handleDelete = async (invoiceId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        // await deleteInvoice(baseURL, invoiceId);
        setInvoices(invoices.filter(inv => inv.id !== invoiceId));
        toast.success('Invoice deleted successfully');
      } catch (error) {
        toast.error('Failed to delete invoice');
      }
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
  <div className="container py-5">

    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-bold">Invoices</h3>
      <button className="btn btn-primary" onClick={handleCreateNew}>
        + New Invoice
      </button>
    </div>

    <div className="row g-4">

      {/* Create Invoice Card */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div
          onClick={handleCreateNew}
          className="card h-100 text-center border-2 border-dashed shadow-sm d-flex align-items-center justify-content-center"
          style={{
            cursor: "pointer",
            minHeight: "220px",
            transition: "0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <Plus size={40} className="text-primary" />
          <p className="mt-3 fw-medium">Create Invoice</p>
        </div>
      </div>

      {/* Existing Invoices */}
      {invoices.length === 0 ? (
        <div className="col-12 text-center text-muted py-5">
          <p>No invoices yet. Create your first one 🚀</p>
        </div>
      ) : (
        invoices.map((invoice) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={invoice.id}>
            <div
              className="card h-100 shadow-sm border-0"
              style={{
                cursor: "pointer",
                transition: "0.3s",
                borderRadius: "12px"
              }}
              onClick={() => handleViewClick(invoice)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >

              {/* Delete Button */}
              <button
                onClick={(e) => handleDelete(invoice.id, e)}
                className="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0 m-2"
                style={{ zIndex: 1 }}
              >
                <Trash2 size={14} />
              </button>

              {/* Thumbnail */}
              {invoice.thumbnailUrl && (
                <img
                  src={invoice.thumbnailUrl}
                  alt="Invoice"
                  className="card-img-top"
                  style={{
                    height: "140px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px"
                  }}
                />
              )}

              {/* Content */}
              <div className="card-body">

                <h6 className="fw-semibold mb-1">
                  {invoice.title || "Untitled"}
                </h6>

                <small className="text-muted d-block mb-2">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </small>

                {invoice.totalAmount > 0 && (
                  <div className="fw-bold text-success">
                    ₹{invoice.totalAmount.toLocaleString("en-IN")}
                  </div>
                )}

              </div>
            </div>
          </div>
        ))
      )}

    </div>
  </div>
);
}