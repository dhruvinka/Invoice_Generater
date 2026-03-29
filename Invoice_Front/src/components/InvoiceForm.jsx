import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Trash2 } from 'lucide-react'
import { AppContext } from '../context/AppContext';

export default function InvoiceForm() {
const { invoiceData, setInvoiceData } = useContext(AppContext);    

 const additem = () => {
  setInvoiceData((prev) => ({
    ...prev,
    items: [
      ...prev.items,
      {
        name: "",
        qty: "",
        amount: "",
        description: "",
        total: 0
      }
    ]
  }));
};

const deleteItem =(index) =>{
 const items= invoiceData.items.filter((_,i)=>i !== index);
 setInvoiceData((prev)=>({...prev,items}));
}

const handleSubmit= () =>{
  console.log(invoiceData)
}

useEffect(()=>{
  if(!invoiceData.invoice.number){
    const randomnumber=`INV-${Math.floor(100000 +Math.random()* 900000)}`;
    setInvoiceData((prev)=> ({
      ...prev,
      invoice:{...prev.invoice,number :randomnumber},
    }))
  }
},[])

const calTotals=()=>{
       const subTotal=invoiceData.items.reduce((sum,item)=>sum + (item.total || 0)  , 0);
       const taxRate =Number(invoiceData.tax || 0);
       const taxAmount=(subTotal *taxRate) /100;
       const grandTotal =subTotal +taxAmount;

       return {subTotal,taxAmount,grandTotal};
}

const {subTotal,taxAmount,grandTotal}=calTotals();

const  handlechange= (section,field,value)=>{
 setInvoiceData((prev)=>({
  ...prev,
  [section]:{...prev[section],[field]:value}
 }));
}

const handleItemChange = (index, field, value) => {
  const items = [...invoiceData.items];

  items[index][field] = value;

  const qty = parseFloat(items[index].qty) || 1;
const amount = parseFloat(items[index].amount) || 0;

items[index].total = qty * amount;

  setInvoiceData((prev) => ({ ...prev, items }));
};

const handleLogoUpload=(e) =>{
  const file =e.target.files[0];
  if(file)
  {
    const reader=new FileReader();
    reader.onloadend=()=>{
      setInvoiceData((prev)=>({
        ...prev,
        logo:reader.result
      }))
    };
    reader.readAsDataURL(file);
  }
}

const handleSameasBilling = () => {
  setInvoiceData((prev) => ({
    ...prev,
    shipping: { ...prev.billing }
  }));
};

  return (
    <div className="invoiceform container py-4">
      {/** Company Logo */}
      <div className="mb-4">
        <h5>Company Logo</h5>
        <div className="align-items-center gap-3">
          <label htmlFor="image" className='form-label'>
            <img src={invoiceData.logo ? invoiceData.logo : assets.upload} alt="upload" width={98} />
          </label>
          <input type="file" name='logo' id='image' hidden className='form-control' accept='image/*'
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/** Company name */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className='form-control' placeholder='Company name'
             onChange={(e)=>handlechange('company','name',e.target.value)}
             value={invoiceData.company.name}/>
          </div>
          <div className="col-md-6">
            <input type="text" className='form-control' placeholder='Company Phone'
            onChange={(e)=>handlechange('company','phone',e.target.value)}
             value={invoiceData.company.phone}/>
          </div>
          <div className="col-12">
            <input type="text" className='form-control' placeholder='Company address'
            onChange={(e)=>handlechange('company','address',e.target.value)}
             value={invoiceData.company.address}/>
          </div>
        </div>
      </div>

      {/** Bill to */}
      <div className="mb-4">
        <h5>Bill to</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className='form-control' placeholder='Name'
            onChange={(e)=>handlechange('billing','name',e.target.value)}
             value={invoiceData.billing.name}/>
          </div>
          <div className="col-md-6">
            <input type="text" className='form-control' placeholder='Phone Number'
              onChange={(e)=>handlechange('billing','phone',e.target.value)}
              value={invoiceData.company.phone}/>
          </div>
          <div className="col-12">
            <input type="text" className='form-control' placeholder='Address'
             onChange={(e)=>handlechange('billing','address',e.target.value)}
             value={invoiceData.billing.address}/>
          </div>
        </div>
      </div>

      {/** Ship to */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Ship To</h5>
          <div className="form-check">
            <input type='checkbox' 
            className='form-check-input' 
            id="sameAsBilling"
            onChange={handleSameasBilling} />
            <label htmlFor="sameAsBilling" className='form-check-label'>
              Same as Billing
              </label>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <input type="text"
             className='form-control'
              placeholder='Name'
              onChange={(e)=>handlechange('shipping','name',e.target.value)}
             value={invoiceData.shipping.name}/>
          </div>
          <div className="col-md-6">
            <input type="text"
             className='form-control' 
             placeholder='Phone Number'
             onChange={(e)=>handlechange('shipping','phone',e.target.value)}
             value={invoiceData.shipping.phone}
             />
          </div>
          <div className="col-12">
            <input type="text"
             className='form-control' 
             placeholder='Shipping address'
             onChange={(e)=>handlechange('shipping','address',e.target.value)}
             value={invoiceData.shipping.address}/>
          </div>
        </div>
      </div>

      {/** Invoice info */}
      <div className="mb-4">
        <h5>Invoice Information</h5>
        <div className="row g-3">
          <div className="col-md-12">
            <label htmlFor="invoiceNumber" className='form-label'>Invoice Number</label>
            <input type="text" disabled className='form-control' 
             id='invoiceNumber'
             onChange={(e)=>handlechange('invoice','number',e.target.value)}
             value={invoiceData.invoice.number}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="invoiceDate" className='form-label'>Invoice Date</label>
            <input type="date" className='form-control' id='invoiceDate' 
            onChange={(e)=>handlechange('invoice','date',e.target.value)}
             value={invoiceData.invoice.date}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="invoiceDueDate" className='form-label'>Invoice Due Date</label>
            <input type="date" className='form-control' id='invoiceDueDate'
            onChange={(e)=>handlechange('invoice','dueDate',e.target.value)}
             value={invoiceData.invoice.dueDate}/>
          </div>
        </div>
      </div>

      {/** Item Details */}
<div className="mb-4">
  <h5>Item Details</h5>

  {invoiceData.items.map((item, index) => (
    
    <div key={index} className="card p-3 mb-3">

      <div className="row g-3 mb-2">

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Item Name"
            value={item.name}
            onChange={(e)=>handleItemChange(index,'name',e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="number"
            min={1}
            className="form-control"
            placeholder="qty"
            value={item.qty || 1}
            onChange={(e)=>handleItemChange(index,'qty',e.target.value)}
          />
        </div>

        <div className="col-md-3">
        <input
          type="number"
          min={0}
          className="form-control"
          placeholder="Amount"
          value={item.amount}   
          onChange={(e)=>handleItemChange(index,'amount',e.target.value)}
/>
        </div>
        

        <div className="col-md-3">
          <input
            type="number"
            min={0}
            className="form-control"
            placeholder="Total"
            value={item.total}
            disabled          
          />
        </div>

      </div>

      <div className="d-flex gap-2 mb-2">

        <textarea
          className="form-control"
          placeholder="Description"
          value={item.description}
          onChange={(e)=>handleItemChange(index,'description',e.target.value)}

        >

        </textarea>

        {invoiceData.items.length > 1 && (
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={()=>deleteItem(index)}
          >
            <Trash2 size={24} />
          </button>
        )}

      </div>

    </div>

  ))}

  <button
    className="btn btn-primary"
    type="button"
    onClick={additem}
  >
    Add Item
  </button>

</div>

      {/** Account info */}
      <div className="mb-4">
        <h5>Bank Account Information</h5>
        <div className="row g-3">
          <div className="col-12">
            <input type="text" className='form-control' placeholder='Account Holder Name' 
            value={invoiceData.account.name}
            onChange={(e)=>handlechange('account','name',e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input type="number" className='form-control' placeholder='Account Number' 
              value={invoiceData.account.number}
              onChange={(e)=>handlechange('account','number',e.target.value)}

              />
          </div>
          <div className="col-md-6">
            <input type="text" className='form-control' placeholder='Branch/IFSC Code'
              value={invoiceData.account.ifsccode}
              onChange={(e)=>handlechange('account','ifsccode',e.target.value)}
              />

          </div>
        </div>
      </div>

      {/** Totals */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-50">
            <div className='d-flex justify-content-between mb-2'> 
              <span>Subtotal</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <label htmlFor="taxInput" className='me-2'>Tax Rate(%)</label>
              <input type="number" className='form-control w-50 text-end' id='taxInput' placeholder='2'
              value={invoiceData.tax}
              onChange={(e)=> setInvoiceData((prev)=>({...prev,tax:e.target.value}))}/>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span>Tax Amount</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between fw-bold mt-2 pt-2 border-top'>
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/** Notes */}
      <div className="mb-4">
        <h5>Notes:</h5>
        <div className="w-100">
          <textarea name="notes" className='form-control' rows={3}
          value={invoiceData.notes}
          onChange={(e)=>setInvoiceData((prev)=>({...prev ,notes:e.target.value}))}
          ></textarea>
        </div>
      </div>
    </div>
  )
}