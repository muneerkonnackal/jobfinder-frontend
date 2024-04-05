import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimg from "../Assets/userplus.jpg";
import { addProfileAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


function CandidateProfile() {
  
 
  const navigate = useNavigate()
  const [isData,setIsData]=useState({})
  useEffect(()=>{
     setIsData(JSON.parse(sessionStorage.getItem("existingCandidate")))
    },[])
    const [profileDetails, setProfileDetails]=useState({})
    useEffect(() => {
      const existingCandidateData = JSON.parse(sessionStorage.getItem("existingCandidate"));
    
      if (existingCandidateData) {
        setProfileDetails({
          id: existingCandidateData._id || '',
          username: existingCandidateData.username || '',
          email: existingCandidateData.email || '',
          skills: existingCandidateData.skills || [],
          resumepdf: '',
          profileImage: '',
          profession: '',
          qualification: '',
          mobile: '',
          location: '',
          linkedin: '',
          about: '',
        });
      }
    }, []); 
  // const [profileDetails, setProfileDetails] = useState({
  //    id: isData._id,
  //   username: isData.username,
  //     email:isData.email,
  //     skills:[],
  //     resumepdf: "",
  //     profileImage:"",
  //     profession: "",
  //     qualification: "",
  //     mobile: "",
  //     location: "",
  //     linkedin:"",
  //     about:""
  // });
  

  //*store token for fetch id
  const [token , setToken] =useState("")
 

  //*to hold the url of the image
  const [preview,setPreview]= useState("")
  const [isPdf , setIsPdf]= useState("")

  console.log(profileDetails);

  useEffect(()=>{
    if(profileDetails.profileImage){
        setPreview(URL.createObjectURL(profileDetails.profileImage))
    }
  },[profileDetails.profileImage])
  console.log(preview);

   useEffect(()=>{
    if(profileDetails.resumepdf){
        setIsPdf(profileDetails.resumepdf)
    }
   },[profileDetails.resumepdf])
   console.log(isPdf);

   useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
   },[])
   console.log('token:',token);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);
  const handleClose1 = () => {
    setProfileDetails({
      username: "",
      email: "",
      skills:"",
      resumepdf: "",
      profileImage:"",
      profession: "",
      qualification: "",
      mobile: "",
      location: "",
      linkedin:"",
      about:""
    });
    setPreview("")
    setIsPdf("")
  };

  const handleAdd = async(e)=>{
    e.preventDefault()
    const {username, email,skills, resumepdf,profileImage,profession,qualification, mobile,location,linkedin,about} = profileDetails

    if(!username || !email || !resumepdf || !skills|| !profileImage || !profession || !qualification || ! mobile || !location || !linkedin || !about){
        toast.warn('Please fill the form completely')
    }
    else{
        //*reqBody
        //*if there is any uploading content from the system we should send the data  or body in the form of FormData()
        //*1. create an object for the class formdata()
        const reqBody = new FormData()
        //*2 add value to the formdata()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("resumepdf",resumepdf)
        reqBody.append("skills",skills)
        reqBody.append("profileImage",profileImage)
        reqBody.append("profession",profession)
        reqBody.append("qualification",qualification)
        reqBody.append("mobile",mobile)
        reqBody.append("location",location)
        reqBody.append("linkedin",linkedin)
        reqBody.append("about",about)

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`

        }
        const result = await addProfileAPI(reqBody,reqHeader)
        console.log(result);

        if(result.status===200){
            toast.success('Profile added successfully')
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile Completed 10/10 ",
              showConfirmButton: true,
              timer: 2500
            });
            handleClose()
            sessionStorage.setItem("existingProfile",JSON.stringify(result.data))
            setTimeout(()=>{
              navigate('/')
          },2000)
        }
        else{
            console.log(result);
            toast.error(result.response.data)
        }
    }
  }


  return (
    <>
      <div>
        <h4>You are new to platform please complete your Profile</h4>
        <button
          onClick={handleShow}
          className="btn btn-success rounded-5 shadow border border-2 "
        >
          <i class="fa-solid fa-file-pen me-2"></i> Complete your Profile
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
            Add your profile details
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
                        setProfileDetails({
                          ...profileDetails,
                          profileImage: e.target.files[0],
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
                    placeholder="username"
                    autoFocus
                    value={isData.username}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          username: e.target.value
                        })
                      }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="email"
                    value={ isData.email}
                    onChange={(e) =>
                        setProfileDetails({
                        ...profileDetails,
                        email: e.target.value
                      })
                    }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Enter your Skills"
                    value={profileDetails.skills}
                    onChange={(e) =>
                        setProfileDetails({
                        ...profileDetails,
                        skills: e.target.value
                      })
                    }
                  />
                </div>


                <div className="w-100">
                      <label
                        htmlFor="pdfdetails"
                        style={{ width: "100%" }}
                        className="mt-3 d-flex justify-content-start align-items-center"
                      >
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="pdfdetails"
                          onChange={(e) =>
                            setProfileDetails({
                              ...profileDetails,
                              resumepdf: e.target.files[0],
                            })
                          }
                        />
                        
                          <button
                          className="btn rounded btn-info shadow "
                          onClick={() => document.getElementById("pdfdetails").click()}
                        >
                        {!profileDetails.resumepdf ? <i class="fa-solid fa-arrow-up-from-bracket fa-bounce me-2"></i> :<i class="fa-solid fa-file-pdf text-danger"></i>}  {profileDetails.resumepdf ? profileDetails.resumepdf.name : "Upload Resume"}</button>
                      </label>
                    </div>

                {/* <div className="mb-2 border p-1">
                <label style={{marginLeft:"-10px"}} className="btn text-lightgrey">Upload Resume</label>
                <input
                className="mb-2"
                      type="file"
                    //   style={{ display: "none" }}
                      id="cv"
                    
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          resumepdf: e.target.files[0],
                        })
                      }
                    />
                    
                 
                </div> */}

              </div>
            </Col>
            <Col md={6}>
              <div>
                <div className="mb-3  mt-4">
                
                      <input
                        type="text"
                        className="form-control rounded border border-2"
                        placeholder="Profession"
                       value={profileDetails.profession}
                        onChange={(e) =>
                            setProfileDetails({
                              ...profileDetails,
                              profession: e.target.value
                            })
                          }
                      />
                 
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Educational Qualification"
                    value={profileDetails.qualification}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          qualification: e.target.value
                        })
                      }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Contact number"
                    value={profileDetails.mobile}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          mobile: e.target.value
                        })
                      }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Location"
                    value={profileDetails.location}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          location: e.target.value
                        })
                      }
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="linkedin link"
                    value={profileDetails.linkedin}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          linkedin: e.target.value
                        })
                      }
                  />
                </div>

                <div>
                  <textarea
                    className="form-control rounded border border-2"
                    placeholder="About You"
                    rows={3} // Set the number of rows to increase the size
                    value={profileDetails.about}
                    onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          about: e.target.value
                        })
                      }
                  ></textarea>
                </div>
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
          <button onClick={handleAdd} className="btn rounded-5 text-light" style={{ background: "green" }}>
            Add Profile
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default CandidateProfile;
