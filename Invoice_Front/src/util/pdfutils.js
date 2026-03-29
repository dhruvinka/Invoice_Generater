import html2canvas from "html2canvas"
import jsPDF from "jspdf";

export const genratePdfFromElement = async (element,filename="invoice.pdf",returnBlod=false)=> {


   const canvas=await html2canvas (element,{

        scale:2,
        useCORS:true,
        backgroundColor:"#fff",
        scrollY:-window.screenY
    });

    const imageData=canvas.toDataURL("image/jpeg");
    const pdf=new jsPDF("p","pt","a4");
    const imageprops=pdf.getImageProperties(imageData);

    const pdfWidth=pdf.internal.pageSize.getWidth();
    const pdfHeight=(imageprops.height * pdfWidth ) / imageprops.width;

    pdf.addImage(imageData,"JPEG",0,0,pdfWidth,pdfHeight);


    if(returnBlod)
    {
        return pdf.output('blob');
    }
else{
    pdf.save(filename);
}


}