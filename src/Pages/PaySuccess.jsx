import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import 'animate.css'; 
import Confetti from 'react-confetti';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PaySuccess() {
  const [query] = useSearchParams();
  const payment_id = query.get('payment_id');
  const plan = query.get('plan');
  const amount = query.get('amount');
  const name = query.get('name');
  console.log(plan);
  const contentRef = useRef(null);
  function getSubscriptionDuration(plan) {
    switch (plan.toLowerCase()) {
      case 'basic plan':
        return 'One Month Subscription';
      case 'standard plan':
        return 'One Month Subscription';
      case 'classic plan':
        return 'One Year Subscription';
      default:
        return '';
    }
  }


  // const generatePDF = async (content, fileName) => {
  //   const pdf = new jsPDF();
  //   const canvas = await html2canvas(content);
  //   const imageData = canvas.toDataURL('image/png');
  //   pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
  //   pdf.save(`${fileName}.pdf`);
  // };

  const generatePDF = async (content, fileName) => {
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
    });
  
    const canvas = await html2canvas(content, {
       
      scale: 2, // Adjust the scale as needed
      logging: true, // Enable logging to troubleshoot if needed
    });
  
    const imageData = canvas.toDataURL('image/png');
  
    pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
    pdf.save(`${fileName}.pdf`);
  };


  const handleDownloadPDF = () => {
    generatePDF(contentRef.current, 'PaymentReceipt');
  };


  const [isConfettiActive, setIsConfettiActive] = useState(true);

  useEffect(() => {
    // Set a timeout to turn off confetti after 5000 milliseconds (5 seconds)
    const timeoutId = setTimeout(() => {
      setIsConfettiActive(false);
    }, 4000);

    // Clear the timeout when the component unmounts or when needed
    return () => clearTimeout(timeoutId);
  }, []);



  const fileContent = `
  Payment Receipt
  ----------------
  Name: ${name}
  Payment ID: ${payment_id}
  Plan: ${plan}
  Amount: ₹${amount}.00
`;

  const handleDownloadReceipt = () => {
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `PaymentReceipt_${payment_id}.txt`);
  };



  const handleCopyPaymentId = () => {
    navigator.clipboard.writeText(payment_id); 
    alert('Payment ID copied to clipboard!');
  };

  return (
   <>
      {isConfettiActive && <Confetti />}
      <div style={{height:"100vh",background:
      'linear-gradient(90deg, rgba(207,164,238,0.9579481450783438) 0%, rgba(144,63,248,1) 100%)' }} className='d-flex w-100 justify-content-center align-items-center'>
        
        <div ref={contentRef} style={{ width: '900px', height: '500px'}} className='animate__animated animate__zoomIn  text-success bg-light rounded-5 border border-warning  shadow d-flex justify-content-center align-items-center flex-column'>
          
          <h1 style={{fontSize:"55px"}} className=' '>Congratulations <span className='text-warning '>{name.charAt(0).toUpperCase()+name.substring(1)}</span><i class="fa-solid fa-crown ms-2 text-primary fa-bounce"></i></h1>
          <h3 className='text-  text-success '>Successfully Completed Payment<i class="fa-solid fa-check ms-2 text-success"></i></h3>
          <h2 className='text-primary fa-fade fw-bold'>Welcome to Premium Club</h2>
         <div className='mt-4'>
              <h4 className='text-dark'>Payment ID:<span className='text-primary ms-3'> {payment_id}</span></h4>
              <h4 className='text-dark'> Plan: <span className='text-primary ms-2'>{plan}</span></h4>
              <h4 className='text-dark'>Amount:<span className='text-primary ms-2'>₹ {amount}.00</span></h4>
              <h4 className='text-dark'>Subscription Duration:<span className='text-primary ms-2'> {getSubscriptionDuration(plan)}</span></h4>
               
         </div>
         <div className='d-flex   justify-content-evenly gap-4 align-items-center'>
           <button onClick={handleDownloadReceipt} className='btn btn- rounded-5 mt-3 border border-2 border-warning '><i class="fa-solid fa-download fa-beat me-2"></i>Receipt</button>
           <button onClick={handleDownloadPDF} className='btn btn- rounded-5 mt-3 border border-2 border-warning '><i className="fa-solid fa-download fa-beat me-2"></i>PDF</button>
  
           <button onClick={handleCopyPaymentId} className='btn btn- rounded-5 mt-3 border border-2 border-warning '><i class="fa-solid fa-copy fa-beat me-2"></i>Payment ID</button>
    
           <Link to={'/dashboard'}><button className='btn btn- w-100 rounded-5 mt-3 border border-2 border-warning '><i class="fa-solid fa-left-long fa-beat me-2"></i> Dashboard</button></Link>
         </div>
        </div>
      </div>
   </>
  );
}


export default PaySuccess