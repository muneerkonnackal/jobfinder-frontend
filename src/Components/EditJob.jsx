import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {editAdminJobsAPI } from '../services/allAPI';
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from '../services/baseurl';
import { editJobResponseContext } from '../Contexts/ContextShare';

function EditJob({job}) {

    const { editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
    const [show, setShow] = useState(false);

    const [preview,setPreview] = useState("")
     const [jobDetails,setJobDetails]=useState({
        id: job._id,
        company:job.company,
        position:job.position,
        qualification:job.qualification,
        lastdate:job.lastdate,
        typeofworker:job.typeofworker,
        expsalary:job.expsalary,
        location:job.location,
        worktype:job.worktype,
        companylogo:""
      })

    const handleClose = () => {setShow(false); 
            handleClose1() }
    const handleShow = () => setShow(true);
    console.log(job);


    useEffect(()=>{
        if(jobDetails.companylogo){
            setPreview(URL.createObjectURL(jobDetails.companylogo))
        }
    },[jobDetails.companylogo])

    const handleClose1 = ()=>{
        setJobDetails({
            company:job.company,
            position:job.position,
            qualification:job.qualification,
            lastdate:job.lastdate,
            typeofworker:job.typeofworker,
            expsalary:job.expsalary,
            location:job.location,
            worktype:job.worktype,
            companylogo:""
        })
        setPreview("")
    }
     
    const handleUpdate = async () => {
        console.log("Before API request - Job Details:", jobDetails);
      
        const {
          id,
          company,
          position,
          qualification,
          lastdate,
          typeofworker,
          expsalary,
          location,
          worktype,
          companylogo,
        } = jobDetails;
      
        if (!company || !position || !qualification || !lastdate || !typeofworker || !expsalary || !location || !worktype) {
          toast.warn("Please fill the form completely");
        } else {
          const reqBody = new FormData();
          reqBody.append("company", company);
          reqBody.append("position", position);
          reqBody.append("qualification", qualification);
          reqBody.append("lastdate", lastdate);
          reqBody.append("typeofworker", typeofworker);
          reqBody.append("expsalary", expsalary);
          reqBody.append("location", location);
          reqBody.append("worktype", worktype);
      
          if (companylogo instanceof File) {
            reqBody.append("companylogo", companylogo);
          } else {
            reqBody.append("companylogo", job.companylogo);
          }
      
          const token = sessionStorage.getItem("token");
      
          try {
            const reqHeader = {
              "Authorization": `Bearer ${token}`,
            };
      
            if (companylogo instanceof File) {
              reqHeader["Content-Type"] = "multipart/form-data";
            } else {
              reqHeader["Content-Type"] = "application/json";
            }
      
            const result = await editAdminJobsAPI(id, reqBody, reqHeader);
            console.log(result);
      
            if (result.status === 200) {
              console.log(result.data);
               setEditJobResponse(result.data)
              toast.success("Updated successfully");
              handleClose();
             
            } else {
              toast.error("Failed to update job");
            }
          } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update job");
          }
        }
      };
      


    // const handleUpdate = async () => {
    //     console.log("Before API request - Job Details:", jobDetails);
    //     const {
    //         id,company,position, qualification,lastdate,typeofworker, expsalary,location,worktype, companylogo } = jobDetails;
      
    //       if (!company || !position || !qualification || !lastdate || !typeofworker || !expsalary || !location || !worktype) {
    //         toast.warn("Please fill the form completely");
    //       } else {
    //       const reqBody = new FormData();
    //       reqBody.append("company", company);
    //       reqBody.append("position", position);
    //       reqBody.append("qualification", qualification);
    //       reqBody.append("lastdate", lastdate);
    //       reqBody.append("typeofworker", typeofworker);
    //       reqBody.append("expsalary", expsalary);
    //       reqBody.append("location", location);
    //       reqBody.append("worktype", worktype);
    //       preview?reqBody.append("companylogo",companylogo):reqBody.append("companylogo",job.companylogo)
        
    //       const token = sessionStorage.getItem("token")
    //       if(preview){
    //                 const reqHeader = {
    //                     "Content-Type": "multipart/form-data",
    //                     "Authorization" : `Bearer ${token}` 
    //                   }
    //                   const result = await editAdminJobsAPI(id,reqBody,reqHeader)
    //                   console.log(result);
    //                   //after seting backend controller and router
    //                   if(result.status===200 ){
    //                       console.log(result.data);
    //                       toast.success("updated successfully")
    //                       handleClose()
    //                     //   setEditJobResponse(result.data)
    //                   }
    //             }
    //             else{
    //                 const reqHeader = {
    //                     "Content-Type":"application/json",
    //                     "Authorization" : `Bearer ${token}` 
    //                   }
    //                   const result = await editAdminJobsAPI(id,reqBody,reqHeader)
    //                   console.log(result);
    //                   //after seting backend controller and router
    //                   if(result.status==200 ){
    //                     console.log(result.data);
    //                     toast.success("updated successfully")
    //                     handleClose()
    //                     // setEditJobResponse(result.data)
    //                 }
        
    //             }
    //          }
    //     }     
      
    //       if (jobDetails.companylogo instanceof File) {
    //         reqBody.append("companylogo", jobDetails.companylogo);
    //       }else{

    //       }
      
    //       const token = sessionStorage.getItem("token");
      
    //       const reqHeader = {
    //         "Content-Type": "multipart/form-data",
    //         "Authorization" : `Bearer ${token}` 
    //       }
      
    //       try {
    //         const result = await editAdminJobsAPI(id, reqBody, reqHeader);
    //         console.log(result);
      
    //         if (result.status === 200) {
    //           console.log(result.data);
    //           toast.success("updated successfully");
    //           handleClose();
    //           setEditJobResponse(result.data);
    //         }
    //       } catch (error) {
    //         console.error("Error updating job:", error);
    //         toast.error("Failed to update job");
    //       }
    //     }
    //     console.log("After API request");
    //   };

     
      

    // const handleUpdate = async()=>{
    //     console.log("Before API request - Job Details:", jobDetails);
    //     const {id,company,position,qualification,lastdate,typeofworker,expsalary,location,worktype,companylogo}=jobDetails

    //     if(!company || !position || !qualification || !lastdate || !typeofworker || !expsalary || !location || !worktype || !companylogo) {
    //         toast.warn("Please fill the form completely")
    //     }
    //     else{
    //         const reqBody = new FormData()
    //         reqBody.append("company",company)
    //         reqBody.append("position",position)
    //         reqBody.append("qualification",qualification)
    //         reqBody.append("lastdate",lastdate)
    //         reqBody.append("typeofworker",typeofworker)
    //         reqBody.append("expsalary",expsalary)
    //         reqBody.append("location",location)
    //         reqBody.append("worktype",worktype) 
    //         preview?reqBody.append("companylogo",companylogo):reqBody.append("companylogo",job.companylogo)
        

    //     const token = sessionStorage.getItem("token")

    //     if(preview){
    //         const reqHeader = {
    //             "Content-Type": "multipart/form-data",
    //             "Authorization" : `Bearer ${token}` 
    //           }
    //           const result = await editAdminJobsAPI(id,reqBody,reqHeader)
    //           console.log(result);
    //           //after seting backend controller and router
    //           if(result.status===200 ){
    //               console.log(result.data);
    //               toast.success("updated successfully")
    //               handleClose()
    //             //   setEditProjectResponse(result.data)
    //           }
    //     }
    //     else{
    //         const reqHeader = {
    //             "Content-Type":"application/json",
    //             "Authorization" : `Bearer ${token}` 
    //           }
    //           const result = await editAdminJobsAPI(id,reqBody,reqHeader)
    //           console.log(result);
    //           //after seting backend controller and router
    //           if(result.status==200 ){
    //             console.log(result.data);
    //             toast.success("updated successfully")
    //             handleClose()
    //             // setEditProjectResponse(result.data)
    //         }

    //     }
    //   }
    //   console.log("After API request");
    // }
    // console.log("Job Details:", jobDetails);
    // console.log("Company:", jobDetails.company);



  return (
    <>
    
    <button onClick={handleShow} className="btn border-info rounded-2 w-25">
           <i className="fa-solid fa-pen text-info fa-l "></i> 
    </button>
    

    

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
        style={{ border:"none" }}
        className="rounded-5 "
      >
        <Modal.Header closeButton >
          <Modal.Title className="text-center">
            {" "}
            Add your Job Vacancy Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div style={{ width: "100%" }}>
                <div className="w-100">
                  <label
                    htmlFor="details"
                    style={{ width: "100%" }}
                    className="p-3  d-flex justify-content-center align-items-center "
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="details"
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          companylogo: e.target.files[0],
                        })
                      }
                    />
                    <img
                    style={{border: "5px solid #e496ef"}}
                      width={"150px"}
                      height={"150px"}
                      src={preview? preview: `${BASE_URL}/uploads/${job.companylogo}`}
                      alt="no-image"
                      className=" rounded-circle shadow"
                    />
                  </label>
                </div>

                <div className="mb-3  mt-1 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Company Name"
                    autoFocus
                    value={jobDetails.company}
                    onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          company: e.target.value
                        })
                      }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Position"
                    value={ jobDetails.position}
                    onChange={(e) =>
                        setJobDetails({
                        ...jobDetails,
                        position: e.target.value
                      })
                    }
                  />
                </div>

                <div className="mb-1 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Qualification "
                    value={jobDetails.qualification}
                    onChange={(e) =>
                        setJobDetails({
                        ...jobDetails,
                        qualification: e.target.value
                      })
                    }
                  />
                </div>

              
              </div>
            </Col>
            <Col md={6}>
              <div style={{marginTop:"75px"}}>


              

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Last date of application"
                    value={jobDetails.lastdate}
                    onChange={(e) =>
                        setJobDetails({
                        ...jobDetails,
                        lastdate: e.target.value
                      })
                    }
                  />
                </div>


        {/* new */}
        <div className="mb-3" style={{ marginTop: "-25px" }}>
    <label className="form-label"></label>
    <select
        className="form-select rounded border border-2"
        value={jobDetails.typeofworker}
        onChange={(e) => setJobDetails({ ...jobDetails, typeofworker: e.target.value })}
    >
        <option value="" disabled hidden className="text-secondary">Select Candidate Type</option>
        <option value="fresher">Fresher</option>
        <option value="experienced">Experienced</option>
        <option value="any">Intern</option>
    </select>
</div>

                {/* <div className="mb-3" style={{marginTop:"-25px"}}>
                    <label className="form-label"></label>
                    <select
                      className="form-select rounded border border-2"
                      value={jobDetails.typeofworker}
                      onChange={(e) => setJobDetails({ ...jobDetails, typeofworker: e.target.value })}
                    >
                       <option value="" disabled hidden className="text-secondary">Select Candidate Type</option>
                          <option value="fresher">Fresher</option>
                          <option value="experienced">Experienced</option>
                          <option value="any">Intern</option>
                    </select>
                  </div> */}

             

                {/* <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Fresher OR Experienced"
                    value={jobDetails.typeofworker}
                    onChange={(e) =>
                        setJobDetails({
                        ...jobDetails,
                        typeofworker: e.target.value
                      })
                    }
                  />
                </div> */}


                <div className="mb-3 ">
                   <input
                        type="text"
                        className="form-control rounded border border-2"
                        placeholder="Expected Salary "
                       value={jobDetails.expsalary}
                        onChange={(e) =>
                            setJobDetails({
                              ...jobDetails,
                              expsalary: e.target.value
                            })
                          }
                      />
                 
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Work Location"
                    value={jobDetails.location}
                    onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          location: e.target.value
                        })
                      }
                  />
                </div>


                        {/* new */}
                        <div className="mb-3" style={{ marginTop: "-25px" }}>
    <label className="form-label"></label>
    <select
        className="form-select rounded border border-2"
        value={jobDetails.worktype}
        onChange={(e) => setJobDetails({ ...jobDetails, worktype: e.target.value })}
    >
        <option value="" disabled hidden className="text-secondary">Select Work Type</option>
        <option value="offline">Offline</option>
        <option value="online">Online</option>
        <option value="intern">Intern</option>
        <option value="workfromhome">Work from Home</option>
    </select>
</div>


                {/* <div className="mb-3" style={{marginTop:"-25px"}}>
                    <label className="form-label"></label>
                    <select
                      className="form-select rounded border border-2"
                      value={jobDetails.worktype}
                      onChange={(e) => setJobDetails({ ...jobDetails, worktype: e.target.value })}
                    >
                       <option value="" disabled hidden className="text-secondary">Select Work Type</option>
                          <option value="offline">Offline</option>
                          <option value="online">Online</option>
                          <option value="intern">Intern</option>
                          <option value="workfromhome">Work from Home</option>
                    </select>
                  </div> */}

                {/* <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Work Type"
                    value={jobDetails.worktype}
                    onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          worktype: e.target.value
                        })
                      }
                  />
                </div> */}

                
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn rounded-5 text-light"
            style={{ background: "red" }}
            onClick={handleClose1}
          >
            Cancel
          </button>
          <button onClick={handleUpdate} className="btn rounded-5 text-light" style={{ background: "green" }}>
            Add Profile
          </button>
        </Modal.Footer>
      </Modal>


<ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default EditJob