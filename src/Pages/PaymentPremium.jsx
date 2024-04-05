import React, { useEffect, useState } from 'react';
import paygif from '../Assets/offer2.jpg';
import pay from '../Assets/dribbble_shot_2_final.gif'
import { Col, Row } from 'react-bootstrap';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Link } from 'react-router-dom';
import { addTransactionsAPI, getOffersAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';



function PaymentPremium() {

  //:state for store offers
  const [setOffer,isSetOffer]=useState({})
  const [paidFor, setPaidFor] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
const [candidate,isCandidate] = useState({})
  
useEffect(() => {
  if (sessionStorage.getItem("existingCandidate")) {
    isCandidate(JSON.parse(sessionStorage.getItem("existingCandidate")));
  }
}, []);

 

// //:checkout
// const checkoutHandle = async (name, amount, plan) => {
//   try {
//     // Step 1: Make an asynchronous API call
//     const reqBody = { name, amount,plan};
//     const response = await addTransactionsAPI(reqBody);
//     console.log(response.data);

//     // Step 2: Set up Razorpay options
//     var options = {
//       key: "rzp_test_ZNur9B6YEo4Vxm",
//       amount: response.data.amount,
//       currency: response.data.currency,
//       name: "JobFinder Inc.",
//       description: "Test Transaction",
//       image: "https://play-lh.googleusercontent.com/7bvRb0lYxGyYW5HwjUk0qms8SyBa_d1AM1z83WTehoi8Xkjh4tmGIWrUq-rt2MUcv34k=s180",
//       order_id: response.data.id, // Use response.data.id instead of response.data.order_id
//       callback_url: `${BASE_URL}/payment/payment-verification`,
      
//       prefill: {
//         name: candidate.username,
//         email: candidate.email,
//         contact: "9000090000",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     console.log("opt:", options);

//     // Step 3: Create a new Razorpay instance
//     const rzp1 = new window.Razorpay(options);

//     // Step 4: Open the Razorpay payment modal
//     rzp1.open();

//   } catch (error) {
//     console.error("Error during Razorpay API call:", error);
//     // Handle errors gracefully, e.g., show a user-friendly error message
//   }
// };


//<>checkout2
const checkoutHandle = async (plan) => {
  try {
    // Step 1: Make an asynchronous API call
    const reqBody = { name: candidate.username,email:candidate.email,  amount: selectedAmount, plan };
    const response = await addTransactionsAPI(reqBody);
    console.log(response.data);

    // Step 2: Set up Razorpay options
    var options = {
      key: "rzp_test_ZNur9B6YEo4Vxm",
      amount: response.data.amount,
      currency: response.data.currency,
      name: "JobFinder Inc.",
      description: "Test Transaction",
      image: "https://play-lh.googleusercontent.com/7bvRb0lYxGyYW5HwjUk0qms8SyBa_d1AM1z83WTehoi8Xkjh4tmGIWrUq-rt2MUcv34k=s180",
      order_id: response.data.id,
      callback_url: `${BASE_URL}/payment/payment-verification`,
      prefill: {
        name: candidate.username,
        email: candidate.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("opt:", options);

    // Step 3: Create a new Razorpay instance
    const rzp1 = new window.Razorpay(options);

    // Step 4: Open the Razorpay payment modal
    rzp1.open();

  } catch (error) {
    console.error("Error during Razorpay API call:", error);
    // Handle errors gracefully, e.g., show a user-friendly error message
  }
};



//:get offers from superAdmin

const getCandidateOffers = async()=>{
  const result = await getOffersAPI()
  console.log(result);
  isSetOffer(result.data)
}

useEffect(()=>{
getCandidateOffers()
}, [])
console.log("offers:", setOffer);

  return (
    <>
     <p>
        <div>
          <h1 className='text-center mt-4 '>
            Upgrade <i className='fa-solid fa-arrow-trend-up'></i>{' '}
            <span className='text-primary'>
              Premium <i className='fa-solid fa-crown text-warning fa-fade'></i>
            </span>
          </h1>
          <Row className=''>
            <Col md={3} className='text-center ms-5'>
            <iframe
  className='rounded-4 mb-3 mt-4'
  width='350'
  height='660'
  src="https://www.youtube.com/embed/arzlu6WTCmI?autoplay=1&loop=0"
  title='Enjoy ads free messaging, switch to premium.'
  frameBorder='0'
  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  allowFullScreen
></iframe>

            </Col>
            <Col md={4} className='ms-3'>
              <div className=' mt-4 mb-3 '>
                <img
                  src={`${BASE_URL}/uploads/${setOffer.offerImage}`}
                  height={250}
                  className='rounded-3 ms-2 mb-2'
                  width={475}
                  alt=''
                />
              </div>
              <div
                style={{
                  background:
                    'linear-gradient(90deg, rgba(207,164,238,0.9579481450783438) 0%, rgba(144,63,248,1) 100%)',
                }}
                className='d-flex justify-content-between  algn-items-center p-3 border border-1  rounded-3 ms-2 mb-4'
              >
                <div>
                  <h5 className='text-primary'>
                    Welcome offer
                    <i className='fa-solid fa-tags ms-3 text-warning'></i>
                  </h5>
                  <h4>Basic Plan</h4>
                  <h6>One Month Subscription</h6>
                </div>
                <div>
                <button
    onClick={() => {
      setSelectedPlan("Basic Plan");
      setSelectedAmount(setOffer.basicPlan);
      checkoutHandle("Basic Plan");
    }}
    className='btn btn-success border rounded shadow me-2 mt-4 w-70'
>
    ₹ {setOffer.basicPlan}/Month
</button>


                  {/* <button
                    // onClick={() => proceedToPay('basic')}
                    onClick={()=>checkoutHandle({name:"Basic Plan", amount:setOffer.basicPlan})}
                    className='btn btn-success border  rounded shadow me-2 mt-4 w-70'
                  >
                    ₹ {setOffer.basicPlan}/Month
                  </button> */}
                </div>
              </div>
  
              <div
                style={{
                  background:
                    'linear-gradient(90deg, rgba(207,164,238,0.9579481450783438) 0%, rgba(144,63,248,1) 100%)',
                }}
                className='d-flex justify-content-between  algn-items-center p-3 border border-1  rounded-3 ms-2 mb-4'
              >
                <div>
                  <h5 className='text-primary'>
                    Welcome offer
                    <i className='fa-solid fa-tags ms-3 text-warning'></i>
                  </h5>
                  <h4>Standard Plan</h4>
                  <h6>One Month Subscription</h6>
                </div>
                <div>
                  <button
                    // onClick={() => proceedToPay('standard')}
                    onClick={() => {
                      setSelectedPlan("Standard Plan");
                      setSelectedAmount(setOffer.standardPlan);
                      checkoutHandle("Standard Plan");
                    }}
                    className='btn btn-success border  rounded shadow me-2 mt-4 w-70'
                  >
                    ₹ {setOffer.standardPlan}/Month
                  </button>
                </div>
              </div>
  
              <div
                style={{
                  background:
                    'linear-gradient(90deg, rgba(207,164,238,0.9579481450783438) 0%, rgba(144,63,248,1) 100%)',
                }}
                className='d-flex justify-content-between  algn-items-center p-3 border border-1 rounded-3 ms-2 mb-4'
              >
                <div>
                  <h5 className='text-primary'>
                    Welcome offer
                    <i className='fa-solid fa-tags ms-3 text-warning'></i>
                  </h5>
                  <h4>Classic Plan</h4>
                  <h6>One Year Subscription</h6>
                </div>
                <div>
                  <button
                    // onClick={() => proceedToPay('classic')}
                    onClick={() => {
                      setSelectedPlan("Classic Plan");
                      setSelectedAmount(setOffer.classicPlan);
                      checkoutHandle("Classic Plan");
                    }}
                    className='btn btn-success border  rounded shadow me-2 mt-4 w-70'
                  >
                    ₹ {setOffer.classicPlan}/Year
                  </button>
                </div>
              </div>
            </Col>
            
            <Col md={4} className='text-center  ms-4  mt-'>
              {/* {selectedPlan && (
                <PayPalScriptProvider>
                  <PayPalButtons
                    className='mt-5 w-75 ms-5'
                    createOrder={createOrder}
                    onApprove={async (data, actions) => {
                      const order = await actions.order.capture();
                      console.log('Order captured:', order);
                      handleApprove(data.orderID);
                    }}
                    onCancel={() => {}}
                    onError={(err) => {
                      setError(err);
                      console.log('PayPal checkout onError', err);
                    }}
                  />
                </PayPalScriptProvider>
              )} */}
  
              <div>
                <img className='rounded-5 shadow ' width={500} src={pay} alt="" />
              </div>
              <div>
                <Link to={'/dashboard'}><button className='btn btn-warning mt-3 rounded shadow border border-dark'><i class="fa-solid fa-circle-chevron-left me-2"></i>Back to Jobs</button></Link>
              </div>
            </Col>
          </Row>
        </div>
     </p>
    </>
  );
}

export default PaymentPremium;
