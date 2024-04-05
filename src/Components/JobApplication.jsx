import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { addApplicationAPI } from '../services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { appliedJobResponseContext } from '../Contexts/ContextShare';

function JobApplication({ jobData }) {

  const { applyJobResponse,setApplyJobResponse} = useContext(appliedJobResponseContext)

  const [exCandidate, setExCandidate] = useState({});

useEffect(() => {
  try {
    const existingCandidateString = sessionStorage.getItem('existingCandidate');

    if (existingCandidateString) {
      const existingCandidate = JSON.parse(existingCandidateString);
      setExCandidate(existingCandidate);
    }
  } catch (error) {
    console.error('Error parsing existingCandidate:', error);
  }
}, []);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  console.log(token);

  const [applicationDetails, setApplicationDetails] = useState({
    userId:"" ,
    jobId: jobData._id,
  });

  console.log('applicatioUserID=', applicationDetails.userId);
  console.log('applicationJobId=', applicationDetails.jobId);
  

  useEffect(() => {
    setApplicationDetails((prevDetails) => ({
      ...prevDetails,
      userId: exCandidate._id || '',  
    }));
  }, [exCandidate]);
  console.log(applicationDetails.userId);

  const handleApply = async () => {
    const { userId, jobId } = applicationDetails;
    console.log('Application Details:', applicationDetails);
  
    const reqBody = new FormData();
    reqBody.append('userId', userId);
    reqBody.append('jobId', jobId);
  
    try {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}` 
      }
      const result = await addApplicationAPI(reqBody,reqHeader);
      console.log('API Result:', result);
        
      if (result.status === 201 && result.data.success && result.data.application) {
        toast.success('Successfully Applied');
        setApplyJobResponse(result.data.application)
      } else {
        toast.error(result.data.message || 'Error applying for job');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
  
      // Log the detailed error information
      if (error.response) {
        console.error('Error response from API:', error.response.data);
      }
  
      toast.error('You Already applied for this job');
    }
  };
  
  
  

//     try {
//       const result = await addApplicationAPI(reqBody);
//       if (result.status === 200) {
//         toast.success('Successfully Applied');
//       } else {
//         toast.error(result.response.data);
//       }
//     } catch (error) {
//       console.error('Error applying for job:', error);
//     }
//     setTimeout(() => {
//         // Your code to be executed after 2000 milliseconds (2 seconds)
//       }, 8000);
      
//   };

  return (
    <>
      <div>
       <Link to={'/jobs'}>
            <Button onClick={handleApply} className="w-100 rounded" variant="success">
              Apply
            </Button>
       </Link>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default JobApplication;
