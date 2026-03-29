import React from 'react'
import './LandingPage.css'
import { assets } from '../../assets/assets'

export default function LandingPage() {
  return (
    <>
   <header id="hero" className="hero-section text-white text-center">
  <div className="container d-flex flex-column justify-content-center align-items-center">
    
    <h1 className="hero-title">
      Effortless Invoicing. Professional Results.
    </h1>

    <p className="hero-text">
      Stop wrestling with spreadsheets. QuickInvoice helps you create and send 
      beautiful invoices in minutes, so you get paid faster.
    </p>

    <div className="hero-buttons">
      <button className="btn btn-warning btn-lg fw-bold rounded-pill px-4">
        Generate Your First Invoice
      </button>

      <a
        href="#how-it-works"
        className="btn btn-outline-light btn-lg rounded-pill px-4"
      >
        Learn More
      </a>
    </div>

  </div>
</header>
    <section id="how-it-works" className="steps-section py-5">
  <div className="container text-center">

    <h2 className="fw-bold mb-5">Get Started in 4 Simple Steps</h2>

    <div className="row g-4">

      {/* Step 1 */}
   <div className="col-md-3">
  <div className="step-card h-100">
    <div className="step-icon bg-primary">1</div>
    <h5 className="mt-3">Enter Details</h5>
    <p>
      Quickly fill in your client's information, item descriptions,
      quantities, and prices. Our intuitive form makes it easy.
    </p>
  </div>
</div>

      {/* Step 2 */}
      <div className="col-md-3">
        <div className="step-card">
          <div className="step-icon bg-success">2</div>
          <h5 className="mt-3">Choose Template</h5>
          <p>
            Browse our gallery of professionally designed templates.
            Pick one that matches your brand and style.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="col-md-3">
        <div className="step-card">
          <div className="step-icon bg-warning text-dark">3</div>
          <h5 className="mt-3">Preview Invoice</h5>
          <p>
            See exactly how your invoice will look before sending it.
            Make quick adjustments easily.
          </p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="col-md-3">
        <div className="step-card">
          <div className="step-icon bg-info">4</div>
          <h5 className="mt-3">Download & Save</h5>
          <p>
            Download your invoice as a PDF or send it via email.
            Save it for your records and future reference.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
<section id="features" className="py-5">
  <div className="container">

    <h2 className="text-center mb-5 display-5 fw-bold text-primary">
      Why Choose QuickInvoice?
    </h2>

    {/* Feature 1 */}
    <div className="row align-items-center gy-4">
      <div className="col-md-6">
        <img
          src={assets.Step_1}
          className="img-fluid shadow rounded"
          alt="Invoice form"
        />
      </div>

      <div className="col-md-6">
        <h4 className="fw-bold">Easy to fill invoice details</h4>
        <p className="text-muted">
          Quickly add your client information, invoice items, quantities and prices.
          Everything is simple and intuitive.
        </p>

        <ul className="feature-list">
          <li>Curated list of templates from gallery</li>
          <li>Add your logo and invoice details</li>
          <li>Tailor fields to your needs</li>
        </ul>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="row align-items-center gy-4 mt-5 flex-md-row-reverse">
      <div className="col-md-6">
        <img
           src={assets.Step_2}
          className="img-fluid shadow rounded"
          alt="Dashboard"
        />
      </div>

      <div className="col-md-6">
        <h4 className="fw-bold">Beautiful Dashboard</h4>
        <p className="text-muted">
          Manage your invoices with a clean and powerful dashboard.
        </p>

        <ul className="feature-list">
          <li>View previous invoices</li>
          <li>Route one or more invoices</li>
          <li>Track the invoices</li>
        </ul>
      </div>
    </div>

    {/* Feature 3 */}
    <div className="row align-items-center gy-4 mt-5">
      <div className="col-md-6">
        <img
          src="/images/invoice-preview.png"
          className="img-fluid shadow rounded"
          alt="Preview"
        />
      </div>

      <div className="col-md-6">
        <h4 className="fw-bold">Invoice Preview with Action Buttons</h4>
        <p className="text-muted">
          See a live preview of your invoice before sending.
        </p>

        <ul className="feature-list">
          <li>Live preview</li>
          <li>Switch between multiple invoices</li>
          <li>One click Save, Download and Delete</li>
        </ul>
      </div>
    </div>

    {/* Feature 4 */}
    <div className="row align-items-center gy-4 mt-5 flex-md-row-reverse">
      <div className="col-md-6">
        <img
          src={assets.Step_4}
          className="img-fluid shadow rounded"
          alt="Send invoice"
        />
      </div>

      <div className="col-md-6">
        <h4 className="fw-bold">Send invoices instantly</h4>
        <p className="text-muted">
          Send invoices directly to clients without leaving the app.
        </p>

        <ul className="feature-list">
          <li>Send invoices instantly</li>
          <li>One click to send invoice</li>
          <li>Send unlimited invoices</li>
        </ul>
      </div>
    </div>

  </div>
</section>

<section id="cta" className="cta-section text-center text-white py-5">
  <div className="container">

    <h2 className="fw-bold display-5 mb-3">
      Ready to Streamline Your Invoicing?
    </h2>

    <p className="lead mb-4">
      Join thousands of freelancers and small businesses who trust
      QuickInvoice. Start creating professional invoices today –
      it's fast, easy, and effective!
    </p>

    <button className="btn btn-warning btn-lg fw-bold rounded-pill px-5 py-3">
      Start Generating Invoices
    </button>

    <p className="mt-3 small">
      (This will lead to the invoice generation interface)
    </p>

  </div>
</section>
    
    </>
  )
}
