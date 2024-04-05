import React, { useEffect, useState } from 'react'
import { deleteApplicationAPI, deleteComplaintsAPI, getComplaintsAPI } from '../services/allAPI';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';



function SuperComplaint() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
    };
//store complaints
const [complaints,setComplaint]= useState([])
// const [report,setReport] = useState({})

const getCandidateComplaints = async()=>{
    const result = await getComplaintsAPI()
    console.log(result);
    setComplaint(result.data)
    // setReport(result.data.complaint)
}

// const complaintId = complaints.map(item=> item.complaint._id) 
// console.log("complaint", complaintId);

//delete complaints by admin

const handleDeleteComplaints=async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization" : `Bearer ${token}` 
    }
  
    const result = await deleteComplaintsAPI(id,reqHeader)
    console.log(result);
    if(result.status===200){
        toast.error("Complaint Deleted")
      getCandidateComplaints()
  
    }
    else{
      alert(result.response.data)
    }
  }


  useEffect(() => {
    getCandidateComplaints();
  }, []);
 console.log('fetchedData Complaints', complaints);
 
  return (
    <>
    <button onClick={handleShow} className='btn rounded btn-primary ms-4'>View All<Badge className='ms-2 fa-fade' style={{marginTop:"-20px"}} badgeContent={complaints.length} color="warning">
 
</Badge></button>
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
                <h2 style={{marginLeft:'420px'}} className="text-primary align-items-center "><i class="fa-solid fa-users-viewfinder me-3 text-dark"></i>Complaint Box</h2>
            
           </div>
          </Modal.Title>

        </Modal.Header>
        <Modal.Body >
          <div >
          <table className="table table-bordered">
  <thead>
    <tr className='text-center'>
      <th>#</th>
      <th>Candidate</th>
      <th>Name</th>
      <th>Topic</th>
      <th>Message</th>
      <th>Recruiter</th>
      <th>Name</th>
      <th><i class="fa-regular fa-paper-plane"></i> Candidate</th>
      <th><i class="fa-regular fa-paper-plane"></i> Recruiter</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {complaints.map(({complaint,profile,job,admin}, index) => (
      <tr key={complaint._id} className='text-center'>
        <td className='align-middle'>{index + 1}</td>
        <td>
          <img src={`${BASE_URL}/uploads/images/${profile.profileImage}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" />
        </td>
        <td className='align-middle'>{profile.username}</td>
        <td className='align-middle text-danger'>{complaint.topic}</td>
        <td className='d-flex justify-content-between flex-column'>
         <div className='text-danger'>
             <div className='text-danger'><span className='text-dark'>Complaint:</span> {complaint.message}</div>
            <div><span className='text-dark'>Job:</span>{job.position}</div>
            <div><span className='text-dark'>Company:</span>{job.company}</div>
            <div><span className='text-dark'>Posted On:</span>{new Date(job.createdAt).toLocaleString()}</div>

         </div>
        </td>
        <td className='align-middle'>
        <img src={`${BASE_URL}/uploads/${admin.profile}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" />
        </td>
        <td className='align-middle'>
            {admin.username}
        </td>
        <td className='align-middle'>
         <a href={`mailto:${profile.email}`} className='btn btn-light rounded-5 ms-2'>
            <i style={{ color: "#9f80ff" }} className="fa-solid fa-envelope fa-2xl"></i>
          </a>
        </td>
        <td className='align-middle'>
         <a href={`mailto:${admin.email}`} className='btn btn-light rounded-5 ms-2'>
            <i style={{ color: "#9f80ff" }} className="fa-solid fa-envelope fa-2xl"></i>
          </a>
        </td>
        <td className='align-middle'>
          <button
            className="btn btn-light border-danger rounded-circle"
            onClick={()=>{handleDeleteComplaints(complaint._id)}}
           
          >
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


          </div>

           
        </Modal.Body>
        <Modal.Footer>
          <button
          onClick={handleClose}
            className="btn rounded-5 text-light"
            style={{ background: "red" }}
            
          >
            CLOSE
          </button>
        
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default SuperComplaint