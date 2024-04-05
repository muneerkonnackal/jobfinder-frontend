import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addReportAPI } from '../services/allAPI';


function ReportJob({data}) {

console.log(data);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  
const [candidate,isCandidate] = useState({})


useEffect(()=>{
  try{
    const existingCndidate = sessionStorage.getItem("existingCandidate")
    if(existingCndidate){
      const exCandidate = JSON.parse(existingCndidate)
      isCandidate(exCandidate)
     
    }
  }
  catch(err){
    console.log("error parsing existingCandidate", err);
  }
},[])
console.log("candidate data from sessionstorage", candidate._id);

const [token, setToken] = useState("");

useEffect(() => {
  if (sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"));
  } else {
    setToken("");
  }
}, []);
console.log(token);

//:state to store report message


  const [report,setReport] = useState({
    userId:"",
    jobId: data._id, //from props 
    topic:"",
    message:""

  })

  useEffect(() => {
    setReport((prevDetails) => ({
      ...prevDetails,
      userId: candidate._id ,  
    }));
  }, [candidate]);

  const handleReport = async () => {
    const { userId, jobId ,topic,message} = report;
    console.log('report Details:', report);
    if(!topic|| !message){
      toast.warn("Please fill the form Completely")
    }
  else{
    const reqBody = new FormData();
    reqBody.append('userId', userId);
    reqBody.append('jobId', jobId);
    reqBody.append('topic', topic);
    reqBody.append('message', message);
  
    try {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}` 
      }
      const result = await addReportAPI(reqBody,reqHeader);
      console.log('API Result:', result);
        
      if (result.status === 201) {
        toast.success('Complaint Registered Successfully');
        handleClose()
      } else {
        toast.error(result.data.message || 'Error applying for job');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
  
     
  }
  }
    
}

 

  console.log("report:", report);
  return (
    <>
    
    <Dropdown.Item ><button onClick={handleShow} className='btn btn-primary rounded  w-100 bg-primary '>Report</button></Dropdown.Item>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3  mt-1 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Topic"
                    autoFocus
                    value={report.topic}
                    onChange={(e) =>
                        setReport({
                          ...report,
                          topic: e.target.value
                        })
                      }
                  />
                </div>

                <div>
                  <textarea
                    className="form-control rounded border border-2"
                    placeholder="Message"
                    rows={3} // Set the number of rows to increase the size
                    value={report.message}
                    onChange={(e) =>
                        setReport({
                          ...report,
                          message: e.target.value
                        })
                      }
                  ></textarea>
                </div>
          
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={handleClose}>
            Close
          </button>
          <button  className='btn btn-success' onClick={handleReport}>
            Send
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default ReportJob