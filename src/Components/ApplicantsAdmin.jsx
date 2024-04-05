import React, { useContext, useEffect, useState } from 'react'
import { getApplicantsAPI } from '../services/allAPI';
import Badge from 'react-bootstrap/Badge';
import { appliedJobResponseContext } from '../Contexts/ContextShare';
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import candidateImg from '../Assets/user.jpeg'
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

function ApplicantsAdmin({data}) {
  const { applyJobResponse,setApplyJobResponse} = useContext(appliedJobResponseContext)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
   ;
  };


console.log('Data:', data);
//: const getJobApplications
const { _id: jobId, userId } = data;
console.log(jobId,userId);

// State to store candidate applications
const [candidateApplications, setCandidateApplications] = useState([]);
const [applicationCount, setApplicationCount] = useState(0);
//storing job title
const [jobTitle, setJobTitle] = useState('')

// Function to fetch candidate applications
const getCandidateApplications = async (e) => {
  try {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const result = await getApplicantsAPI(userId,jobId,reqHeader);
    if (result.status === 200) {
      const responseData = result.data;
      console.log('API Response:', responseData);

        setCandidateApplications(responseData.candidates);
        setApplicationCount(responseData.applicationCount);
        setJobTitle(responseData.jobTitle);
      setCandidateApplications(responseData.candidates);
    } else {
      console.error('Failed to fetch candidate applications:', result);
    }
  } catch (error) {
    console.error('Error fetching candidate applications:', error);
  }
};

useEffect(() => {
  getCandidateApplications();
}, [applyJobResponse]); 
console.log("candidateapplication", candidateApplications);


const getPdfFileName = (pdfUrl) => {
  const matches = pdfUrl.match(/pdf-\d+-([^.]+)/);
  if (matches && matches.length > 1) {
    const fileName = matches[1].replace(/_/g, ' '); // Replace underscores with spaces
    return fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName;
  } else {
    return 'Unknown Filename';
  }
};



  return (
    <>
     <Tooltip  title="Click to See the Applicants" placement="bottom-end">
     <h6 onClick={handleShow} style={{marginLeft:"-13px",marginTop:"-10px"}} className="btn rounded ">
      Total Applicants<Badge bg="success rounded-5 ms-1 ">{applicationCount? applicationCount:0}</Badge> 
      
    </h6>
          </Tooltip>
     
    <div>
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
            <h2 style={{marginLeft:'200px'}} className="text-black align-items-center ">Candidates Applied For <span className='text-success'>{jobTitle}</span></h2>
          </Modal.Title>

        </Modal.Header>
        <Modal.Body >
          <div>
    {candidateApplications?.length>0?
      <table className="table table-bordered">
    <thead>
        <tr className='text-center '>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Position</th>
          <th>CV</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {candidateApplications.map((candidate, index) => (
          <tr key={candidate.id} className='text-center'>
            <td className='align-middle'>{index + 1}</td>
            <td>
              <img src={`${BASE_URL}/uploads/images/${candidate.profileImage}`} width={'80px'} height={'75px'} className='rounded-4 border shadow' alt="" />
            </td>
            <td className='align-middle'>{candidate.username}</td>
            <td className='align-middle'>{candidate.profession}</td>
            <td className='align-middle'>
           <Link to={'/openpdf'}>
              <button
                    className="btn border border-warning w-75 rounded-3"
                    onClick={() =>
                      window.open(
                        `${BASE_URL}/uploads/pdfs/${candidate.resumepdf}`,
                        "_blank"
                      )
                    }
                  >
                    {getPdfFileName(candidate.resumepdf)}{" "}
                    <i className="fa-regular fa-file-pdf text-danger ms-2"></i>
                  </button>
           </Link>
            </td>
            <td className='align-middle'>
              <a href={candidate.mobile} className='btn btn-light rounded-5'>
                <i className="fa-brands fa-whatsapp fa-2xl " style={{ color: "#9f80ff" }}></i>
              </a>
              <a href={candidate.linkedin} className='btn btn-light rounded-5 ms-2'>
                <i className="fa-brands fa-linkedin fa-2xl " style={{ color: "#9f80ff" }}></i>
              </a>
              <a href={`mailto:${candidate.email}`} className='btn btn-light rounded-5 ms-2'>
                <i style={{ color: "#9f80ff" }} className="fa-solid fa-envelope fa-2xl"></i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>:
    <p>No Applicants applied</p>
    }
          </div>


         {/* <ol >
           <li>
              <Row className='border border-dark'>
                <Col md={2}>
                  <img src={candidateImg} width={'100px'} alt="" />
                </Col>
                <Col md={3}>
                  <h4 className='d-flex justify-content-center align-items-center mt-4'>Ajmal Mon</h4>
                </Col>
    
                <Col md={2}>
                  <h4 className='d-flex justify-content-center align-items-center mt-4'>Position</h4>
                </Col>
    
                <Col md={2}>
                    <div className='d-flex '>
                      <button className='btn border border-warning rounded mt-4'>CV<i class="fa-solid fa-file-arrow-down ms-2 text-danger" ></i></button>
                      <button className='btn btn-light rounded-5 ms-1'></button>
      
                    </div>
                </Col>
                <Col md={3}>
                    <div className='d-flex mt-4 '>
                      <button style={{color:"#9f80ff"}}  className='btn btn-light rounded-5'><i class="fa-brands fa-whatsapp fa-2xl"></i></button>
                      <button style={{color:"#9f80ff"}}  className='btn btn-light rounded-5 ms-2'><i class="fa-brands fa-linkedin fa-2xl"></i></button>
                      <button style={{color:"#9f80ff"}} className='btn btn-light rounded-5 ms-2'><i class="fa-solid fa-envelope fa-2xl"></i></button>
                     
      
                    </div>
                </Col>
              </Row>
           </li>
         </ol> */}
           
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
    </div>


    </>
  )
}

export default ApplicantsAdmin