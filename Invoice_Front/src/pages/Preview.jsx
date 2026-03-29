import React, { useContext, useEffect, useRef, useState } from 'react'
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import InvoicePreview from '../components/invoicePreview';
import { deleteInvoice, saveInvoice, sendInvoice } from '../service/invoiceService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { uploadInvoiceThumbnail } from '../service/CloudinaryService';
import html2canvas from 'html2canvas';
import { genratePdfFromElement } from '../util/pdfutils';
import { useAuth, useUser } from '@clerk/clerk-react';

export default function Preview() {
  const previewRef = useRef();
  const { selectedTemplate, invoiceData, baseURL, setselectedTemplate } = useContext(AppContext);
  const [downloading,setdownloading]=useState(false);
  const [emailing,setemailing]=useState(false);
  const [loading, setloading] = useState(false);
  const [showModal,setshowModel]=useState(false);
  const [customerEmail,setcustomerEmail]=useState("");
  const {getToken}=useAuth();
  const {user}=useUser();
  const navigate = useNavigate();


  useEffect(()=>{
    

  },[invoiceData,navigate])

  const handleSaveandExit = async () => {
    try {
      setloading(true);
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fff',
        scrollY: -window.screenY,
      });

      const imageData = canvas.toDataURL("image/png");

      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

      const payload = {
        ...invoiceData,
        clerkid:user.id,

        items: invoiceData.items.map(item => ({
          name: item.name,
          description: item.description,
          

          quantity: parseFloat(item.qty) || 1,

          amount: parseFloat(item.amount) || 0
        }))
      };

      const token=await getToken();

      const res = await saveInvoice(baseURL, payload,token);
      if (res.status === 200 || res.status === 201) {
        toast.success("Success");
        navigate('/');
      }
      else {
        toast.err("Not Saved");
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setloading(false);
    }
  }

  const handleDelete = async () => {

    try {

      const token=await getToken();
      const res = await deleteInvoice(baseURL, invoiceData.id,token);
      if (res.status === 204) {
        toast.success("Invoice deleted Successfully");
        navigate("/dashboard");
      }
      else {
        toast.error("Unable to delete invoice");
      }


    } catch (error) {
      toast.error("Failed to delete invoice", error);
    }

  }

  const handleDownloadpdf= async ( ) =>{
    if (!previewRef.current) return ;

    try {
      setdownloading(true);
      await genratePdfFromElement(previewRef.current,'invoice.pdf');

    } catch (error) {
      toast.error("Failed to generate invoice");
    }
    finally{
      setdownloading(false);
    }
  }

  const handleSendEmail = async()=>{
    if(!previewRef.current || !customerEmail){
      return toast.error("Please Enter Valid Email")
    }

    try {
      setemailing(true);
      const pdfblob=await genratePdfFromElement(previewRef.current,'invoice.pdf',true);
     const formData=new FormData();
     formData.append('file',pdfblob,'invoice.pdf');
     formData.append('email',customerEmail);

           const token=await getToken();
     const res=await sendInvoice(baseURL,formData,token);
     if(res.status === 200)
     {
      toast.success("Email send Successfully");
      setshowModel(false);
      setcustomerEmail("");
     }
     else
     {
      toast.error("Failed to send Email");
     }

    } catch (error) {
      toast.error("Failed to send Email",error);
    }
    finally{
      setemailing(false);
    }

  }

  return (
    <div className=" previewpage container-fluid d-flex flex-column p-3 min-vh-100">
      {/** Action buttons */}
      <div className=" d-flex flex-column align-items-center mb-4 gap-3">
        {/**  List of template button*/}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map(({ id, label }) => (
            <button key={id}
              onClick={() => setselectedTemplate(id)}
              style={{ minWidth: '100px', height: '38px' }}
              className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}
            >
              {label}

            </button>
          ))}
        </div>
        {/** List of action Button */}
        <div className=" d-flex flex-wrap justify-content-center gap-2">
          <button className=" btn btn-primary d-flex align-content-center justify-content-center"
            onClick={handleSaveandExit} disabled={loading}>
            {loading && <Loader2 className='me-3 spin-animation ' />}
            {loading ? "Saving..." : "Save and Exit"}
          </button>
          {invoiceData.id && <button className="btn btn-danger"
            onClick={handleDelete}
          >Delete Invoice</button>}
          <button className="btn btn-secondary" onClick={()=>navigate('/dashboard')}>Back to Dashboard</button>
          <button className="btn btn-info"
          onClick={()=>setshowModel(true)}
          >Send Email</button>
          <button className="btn btn-success d-flex align-items-center justify-content-center"
          onClick={handleDownloadpdf} >
            { downloading && (
              <Loader2 className=' me-2 spin-animation' size={18}/>
            )}
            {
            downloading ? "Downloading... " : "Download PDF"
          }</button>
        </div>
      </div>


      {/** Display invoice pre*/}

      <div className=" flex-grow-1 overflow-auto d-flex justify-content-center align-content-center bg-light">
        <div className="invoice-preview"
          ref={previewRef}
        >
          <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
        </div>
      </div>

      {
        showModal && (
          <div className=" modal  d-block" tabIndex="-1" role="dialog" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
                 <div className="modal-dialog" role='document'>
                        <div className="modal-content">
                          <div className="modal-header">
                             <h5>Send Invoice</h5>
                             <button type="button" className=' btn-close' onClick={()=>setshowModel(false)}></button>
                          </div>
                          <div className="modal-body">
                            <input type="email" className=' form-control' 
                            placeholder='Customer email'
                            value={customerEmail}
                            onChange={(e)=>setcustomerEmail(e.target.value)}/>
                          </div>
                          <div className="modal-footer">
                            <button type='button' className='btn btn-primary'
                            onClick={handleSendEmail} disabled={emailing}
                            >
                              {emailing ? "Sending..." :"Send"}
                            </button>
                            <button type='button' className='btn  btn-secondary' onClick={()=>setshowModel(false)}> Cancel</button>
                          </div>
                        </div>
                 </div>
          </div>
        )
      }
    </div>
  )
}
