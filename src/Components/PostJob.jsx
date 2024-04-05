import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addJobsAPI } from '../services/allAPI';
import userimg from "../Assets/userplus.jpg";import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { addJobResponseContext } from '../Contexts/ContextShare';

function PostJob() {

   const {addJobResponse, setAddJobResponse} = useContext(addJobResponseContext)

      //state to hold the value from the input box
  const [jobDetails, setJobDetails] = useState({
      company: "",
      position: "",
      qualification:"",
      lastdate:"",
      typeofworker:"",
      expsalary:"",
      location: "",
      worktype: "",
      companylogo: ""
  });

  const [show, setShow] = useState(false);

  //to hold the url of the image
  const [preview, setPreview] = useState("");
  console.log(jobDetails);

  useEffect(() => {
    if (jobDetails.companylogo) {
      setPreview(URL.createObjectURL(jobDetails.companylogo));
    }
  }, [jobDetails.companylogo]);

  // console.log(preview);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  console.log(token);
  console.log(preview);

  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setJobDetails({
        company: "",
        position: "",
        qualification:"",
        lastdate:"",
        typeofworker:"",
        expsalary:"",
        location: "",
        worktype: ""
    });
    setPreview("");
  };

  const handlePostJobs = async (e) => {
    e.preventDefault();

    const { company, position,qualification,lastdate,typeofworker, expsalary, location, worktype, companylogo } =
      jobDetails;

    if (
      !company ||
      !position ||
      !qualification ||
      !lastdate ||
      !typeofworker ||
      !expsalary ||
      !location ||
      !worktype ||
      !companylogo
    ) {
      toast.warn("Please fill the form completely");
    } else {
      //*reqBody
      //*1) create object for the class form Data
      const reqBody = new FormData();

      //*2) add value to the form data -  append()
      reqBody.append("company", company);
      reqBody.append("position", position);
      reqBody.append("qualification", qualification);
      reqBody.append("lastdate", lastdate);
      reqBody.append("typeofworker", typeofworker);
      reqBody.append("expsalary", expsalary);
      reqBody.append("location", location);
      reqBody.append("worktype", worktype);
      reqBody.append("companylogo", companylogo);

      //reqheader
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        };

        const result = await addJobsAPI(reqBody, reqHeader);
        setAddJobResponse(result)
        console.log(result);
        if (result.status === 200) {
          toast.success("Project successfully added");
          handleClose();
        //   setAddProjectResponse(result.data);
        } else {
          console.log(result);
          toast.error(result.response.data);
        }
      }
    }
  };

  return (
    <>
     <div className='d-flex justify-content-center bg-secondary rounded-4 mt-3 mb-3'>
       <button  onClick={handleShow}  style={{width:"85%"}} className="d-flex justify-content-center btn btn-info mt-3 mb-4 rounded ">
      Post your Jobs
      </button>
     </div>

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
                      src={preview?preview:userimg}
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


                <div className="mb-3" style={{marginTop:"-25px"}}>
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
                        placeholder="Expected Salary in LPA"
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


                <div className="mb-3" style={{marginTop:"-25px"}}>
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
                          <option value="workfromhome">WFH</option>
                    </select>
                  </div>

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
          <button onClick={handlePostJobs} className="btn rounded-5 text-light" style={{ background: "green" }}>
            Add Job
          </button>
        </Modal.Footer>
      </Modal>


<ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default PostJob