import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { appliedJobsAPI, deleteApplicationAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
import jobaddanimation from '../Assets/addjobs.gif'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


function AppliedJobs() {
  const [candidateApplication, setCandidateApplication] = useState([]);

  const getCandidateApplications = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await appliedJobsAPI(reqHeader);

      if (result.status === 200) {
        const responseData = result.data;
        console.log('response', responseData);
        setCandidateApplication(responseData);
      } else {
        console.error('Failed to fetch candidate applications:', result);
      }
    } catch (error) {
      console.error('Error fetching candidate applications:', error);
    }
  };

  useEffect(() => {
    getCandidateApplications();
  }, []);

  console.log('fetchedData', candidateApplication);

  // const handleDelete = async (id) => {
  //   const token = sessionStorage.getItem("token");
  //   const reqHeader = {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`,
  //   };
  
  //   console.log("Deleting application with ID:", id); 
  //   const result = await deleteApplicationAPI(id, reqHeader);
  // // toast.error('delete application')
  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // });
  //   console.log(result);
  //   // after done by backend
  //   if (result.status === 200) {
  //     getCandidateApplications();
  //   } else {
  //     alert(result.response.data);
  //   }
  // };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  
    console.log("Deleting application with ID:", id);
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Attempt to delete the application
          const deleteResult = await deleteApplicationAPI(id, reqHeader);
  
          if (deleteResult.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
  
            // Refresh the list of candidate applications
            getCandidateApplications();
          } else {
            // Handle error if the deletion was unsuccessful
            Swal.fire({
              title: "Error",
              text: deleteResult.response.data,
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting application:", error);
        }
      }
    });
  };
  

// const [loading, setLoading] = useState(true);
// const handleDelete = async (id) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const reqHeader = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };
  
//       // Set loading state while waiting for the API call to complete
//       setLoading(true);
  
//       const result = await deleteApplicationAPI(id, reqHeader);
//       console.log(result);
  
//       // After the API call is done, whether it succeeded or failed
//       setLoading(false);
  
//       // Check the result status
//       if (result.status === 200) {
//         // If successful, fetch the updated list of applications
//         getCandidateApplications();
//       } else {
//         console.error("Failed to delete application:", result);
  
//         // Implement error handling (e.g., show a message to the user)
//         toast.error("Error deleting application");
//       }
//     } catch (error) {
//       console.error("Error deleting application:", error);
  
//       // Implement error handling (e.g., show a message to the user)
//       toast.error("Error deleting application");
//     }
//   };
  

  return (
    <>
      {candidateApplication.length>0?
      candidateApplication.map(({ application, job }) => (
        <div key={application._id} className="p-3">
          <Row className="border-secondary border-3 bg-light border p-2 rounded-5">
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <img
                className="rounded-4"
                src={`${BASE_URL}/uploads/${job.companylogo}`}
                width={'100%'}
                height={'120'}
                alt=""
              />
            </Col>
            <Col md={4} className="mt-4">
              <h5>{job.position}</h5>
              <h6>{job.company}</h6>
             
              <div>
                    <h6>
                      Applied on: {new Date(application.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })}
                    </h6>
                    <h6>
                      Time: {new Date(application.date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </h6>

                   
                  </div>
            </Col>
            <Col md={4} className="mt-4">
              <h6 className=""> ₹ {job.expsalary}</h6>
              {/* <div className="d-flex ">Experience:{job.typeofworker}</div> */}
              <h6 className='mt-2'>Job Type: {job.worktype}</h6>
              <div className=''>
                <button style={{fontSize:"10px"}} className="btn btn-primary mt-2 rounded-5">
                  Applied <i className="fa-solid fa-check ms-2"></i>
                </button>
                <button style={{fontSize:"10px"}}  onClick={()=>handleDelete(application._id)} className="btn mt-2 btn-danger ms-2 rounded-5">
                  <i className="fa-solid fa-trash me-2"></i>Application
                </button>
              </div>
            </Col>
          </Row>
        </div>
      )):
      <div style={{marginTop:"200px"}} className='d-flex flex-column  justify-content-center align-items-center'>
        <h2>No Applications yet!!!</h2>
        <img width={'250px'} src={jobaddanimation} alt="" />
        <Link to={'/jobs'}><button className='btn btn-warning rounded-3 shadow border '>Explore Jobs</button></Link>
        </div> }

         <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default AppliedJobs;
