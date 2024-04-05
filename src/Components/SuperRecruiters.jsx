import React, { useEffect, useState } from 'react'
import { deleteRecruitersAPI, superRecruitersAPI } from '../services/allAPI';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';



function SuperRecruiters() {
    const[adminRecruiters,setAdminRecruiters]=useState([])
    const [searchKey, setSearchKey] = useState("");
    console.log("adminRecruiters:", adminRecruiters);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
    };

    const getSuperRecruiter = async () => {
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
    
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
    
          try {
            const result = await superRecruitersAPI(searchKey, reqHeader);
            console.log(result.data);
            setAdminRecruiters(result.data);
          } catch (error) {
            console.error("Error fetching super admin profiles:", error);
          }
        }
      };

      


      const handleDeleteRecruiter=async(id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${token}` 
        }
      
        const result = await deleteRecruitersAPI(id,reqHeader)
        console.log(result);
        //after done by backend
        if(result.status===200){
            toast.error("Cndidate Profile Deleted")
          getSuperRecruiter()
      
        }
        else{
          alert(result.response.data)
        }
      }
      
      useEffect(()=>{
        getSuperRecruiter()
      },[searchKey])



  return (
    <>
    <button onClick={handleShow} className='btn rounded btn-primary ms-5 '>View All</button>
    
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
                <h2 style={{marginLeft:'200px'}} className="text-primary align-items-center "><i class="fa-solid fa-user-tie me-3 text-dark"></i>All Recruiters</h2>
                <div style={{marginLeft:"300px"}} className="d-flex justify-content-center me-4">
                    <input
                      type="text"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      className="form-control border border-secondary rounded border-3"
                      placeholder="Search by Names"
                    />
                    <i
                      style={{ marginLeft: "-45px", color: "lightgrey" }}
                      class="fa-solid fa-magnifying-glass fa-rotate-90"
                    ></i>
                  </div>
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
      <th>Company</th>
      <th>Designation</th>
      <th>Contact</th>
      <th>Remove <i class="fa-solid fa-user ms-2"></i></th>
    </tr>
  </thead>
  <tbody>
    {adminRecruiters.map((recruiter, index) => (
      <tr key={recruiter.id} className='text-center'>
        <td className='align-middle'>{index + 1}</td>
        <td>
          <img src={`${BASE_URL}/uploads/${recruiter.profile}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" />
        </td>
        <td className='align-middle'>{recruiter.username}</td>
        <td className='align-middle'>{recruiter.company}</td>
        <td className='align-middle'> {recruiter.designation} </td>
        <td className='align-middle'>
          
          <a href={`mailto:${recruiter.email}`} className='btn btn-light rounded-5 ms-2'>
            <i style={{ color: "#9f80ff" }} className="fa-solid fa-envelope fa-2xl"></i>
          </a>
        </td>
        <td className='align-middle'>
          <button
            className="btn btn-light border-danger rounded-circle"
            onClick={()=>handleDeleteRecruiter(recruiter._id)} 
           
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

export default SuperRecruiters