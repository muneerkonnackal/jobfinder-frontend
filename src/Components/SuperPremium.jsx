import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

function SuperPremium() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
    };

    const [result , setResult]= useState([])

    //to access state useSelector hook is used
   const premium = useSelector((state)=>state.premiumReducer) //state represen store  reducer le payload kittullu 
   console.log('premium', premium);
   useEffect(() => {
    setResult(premium);
  }, [premium]);
console.log("result",result);

  return (
    <>
    <button onClick={handleShow} className='btn rounded btn-primary ms-4  '>View All</button>
    


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        scrollable

        
        style={{ border:"none" }}
        className="rounded-5 "
      >
        <Modal.Header closeButton >
          <Modal.Title className="text-align -center">
           <div className='d-flex justify-content-between align-items-center '>
                <h2 style={{marginLeft:'200px'}} className="text-primary align-items-center "><i class="fa-solid fa-crown me-3 text-warning rounded-5  fa-xl"></i>All Premium Members</h2>
            
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
          <th>Plan</th>
          <th>Amount <i className="fa-solid fa-user ms-2"></i></th>
        </tr>
      </thead>



      {/* <tbody>
  {
  result[0] && result[0].map(({ profile, transaction }, index) => (
    <tr key={transaction._id} className='text-center'>
      <td className='align-middle'>{index + 1}</td>
      <td>
        {profile && profile.profileImage && (
          <img
            src={`${BASE_URL}/uploads/images/${profile.profileImage}`}
            width={'80px'}
            height={'75px'}
            className='rounded-4 border shadow'
            alt=""
          />
        )}
      </td>
      <td className='align-middle'>{profile.username}</td>
      <td className='align-middle'>{transaction.plan}</td>
      <td className='align-middle'>{transaction.amount}</td>
    </tr>
  ))}
</tbody> */}

<tbody>
  {result[0] && result[0].length > 0 ? (
    result[0].map(({ profile, transaction }, index) => (
      <tr key={transaction._id} className='text-center'>
        <td className='align-middle'>{index + 1}</td>
        <td>
          {profile && profile.profileImage && (
            <img
              src={`${BASE_URL}/uploads/images/${profile.profileImage}`}
              width={'80px'}
              height={'75px'}
              className='rounded-4 border shadow'
              alt=""
            />
          )}
        </td>
        <td className='align-middle'>{profile?.username}</td>
        <td className='align-middle'>{transaction.plan}</td>
        <td className='align-middle'>{transaction.amount}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center">Nothing to display</td>
    </tr>
  )}
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

export default SuperPremium