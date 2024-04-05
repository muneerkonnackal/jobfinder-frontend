import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
import { getTransactionsAPI } from '../services/allAPI';
import { useDispatch } from 'react-redux';
import { addToPremium } from '../Redux/slices/premiumSlice';



function SuperTransaction() {

    const [transaction, setTransaction] = useState([])

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
    };
    const dispatch = useDispatch()
    const getSuperTransactions = async()=>{
        const result = await getTransactionsAPI()
        console.log(result);
        setTransaction(result.data)
        dispatch(addToPremium(result.data))
    }

 
    
    

useEffect(()=>{
    getSuperTransactions()
},[])

console.log("All Transactions:",transaction);

  return (
    <>
    <button onClick={handleShow} className='btn rounded btn-primary ms-4 '>View All</button>
    


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        scrollable

        
        style={{ border:"none" }}
        className="rounded-5 "
      >
        <Modal.Header closeButton >
          <Modal.Title className="text-align -center">
           <div className='d-flex justify-content-between align-items-center '>
                <h2 style={{marginLeft:'200px'}} className="text-primary align-items-center "><i class="fa-solid fa-hand-holding-dollar me-3 text-warning rounded-5  fa-xl"></i>All Payment Transactions</h2>
            
           </div>
          </Modal.Title>

        </Modal.Header>
        <Modal.Body >
          <div>
          <table className="table table-bordered">
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>TransactionId</th>
          <th>Order Id</th>
          <th>Plan</th>
          <th>Date</th>
          <th>Amount <i className="fa-solid fa-user ms-2"></i></th>
        </tr>
      </thead>
      <tbody>
        {transaction.map(({transaction,profile}, index) => (
          <tr key={transaction.id} className='text-center'>
            <td className='align-middle'>{index + 1}</td>
            <td>
              {/* <img  src={`${BASE_URL}/uploads/images/${profile.profileImage}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" /> */}
              {profile && profile.profileImage && (
        <img src={`${BASE_URL}/uploads/images/${profile.profileImage}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" />
      )}
            </td>
            <td className='align-middle'>{transaction.name}</td>
            <td className='align-middle'>{transaction.razorpay_payment_id}</td>
            <td className='align-middle'>{transaction.razorpay_order_id} </td>
            <td className='align-middle'>{transaction.plan} </td>
            <td className='align-middle'>{new Date(transaction.createdAt).toLocaleString()}</td>
            <td className='align-middle'>{transaction.amount} </td>
          </tr>
        ))}
      </tbody>
    </table>

          </div>

           
        </Modal.Body>
        {/* <Modal.Footer>
          <button
            className="btn rounded-5 text-light"
            style={{ background: "red" }}
            
          >
            Cancel
          </button>
          <button  className="btn rounded-5 text-light" style={{ background: "green" }}>
            Add Profile
          </button>
        </Modal.Footer> */}
      </Modal>
      
      <ToastContainer position="top-center" autoClose={2000} />
    
    
    </>
  )
}

export default SuperTransaction