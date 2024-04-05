import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userimg from "../Assets/userplus3.png";
import { BASE_URL } from "../services/baseurl";
import { editProfileAPI } from "../services/allAPI";


function EditProfile({profile}) {

    const [show, setShow] = useState(false);
// tostore the updating image
    const [preview,setPreview] = useState("")
    const [isPdf,setIsPdf] = useState("")
const [token,isToken]=useState("")

    const [profileDetails, setProfileDetails] = useState({
        
        username: profile.username,
        email: profile.email,
        skills:profile.skills,
        resumepdf: "",
        profileImage:"",
        profession: profile.profession,
        qualification: profile.qualification,
        mobile: profile.mobile,
        location: profile.location,
        linkedin:profile.linkedin,
        about:profile.about
    });
console.log(profileDetails);
    const handleClose = () => { setShow(false);}
    const handleShow = () => setShow(true);
    console.log(profile);

    useEffect(() => {
      if (profile) {
        setProfileDetails({ ...profile });
      }
    }, [profile])

    useEffect(()=>{
        if(profileDetails.profileImage?.type){
            setPreview(URL.createObjectURL(profileDetails.profileImage))
        }
    },[profileDetails.profileImage])

    useEffect(()=>{
      setIsPdf(profileDetails.resumepdf)
    },[profileDetails.resumepdf])
    // console.log(isPdf);

    console.log(preview);
    console.log(isPdf);

    const handleClose1 =()=>{
        setProfileDetails({
         username: profile.username,
        email: profile.email,
        skills:profile.skills,
        resumepdf: "",
        profileImage:"",
        profession: profile.profession,
        qualification: profile.qualification,
        mobile: profile.mobile,
        location: profile.location,
        linkedin:profile.linkedin,
        about:profile.about
        })
        setPreview("")
    }

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      console.log(token);
    
      if (token) {
        isToken(token);
      }
    }, []);

    const handleUpdate = async () => {
      const { username, email, skills, resumepdf, profileImage, profession, qualification, mobile, location, linkedin, about } = profileDetails;
    
      // Check if the required fields are filled
      if (!username || !email || !skills || !profession || !qualification || !mobile || !location || !linkedin || !about) {
        toast.warn("Please fill the form completely");
      } else {
        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("email", email);
        reqBody.append("skills", skills);
        reqBody.append("resumepdf", resumepdf);
        reqBody.append("profileImage", profileImage);
        reqBody.append("profession", profession);
        reqBody.append("qualification", qualification);
        reqBody.append("mobile", mobile);
        reqBody.append("location", location);
        reqBody.append("linkedin", linkedin);
        reqBody.append("about", about);
    
        const token = sessionStorage.getItem("token");
        console.log("Token:", token);
    
        // Ensure that the request is multipart/form-data when uploading files
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
    
        try {
          const result = await editProfileAPI(reqBody, reqHeader);
          console.log(result);
    
          if (result.status === 200) {
            console.log(result.data);
            toast.success("Updated successfully");
            handleClose();
          } else {
            toast.error("Failed to update profile");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error updating profile");
        }
      }
    };
    

    // const handleUpdate = async () => {
    //   const { username, email, skills, resumepdf, profileImage, profession, qualification, mobile, location, linkedin, about } = profileDetails;
    
    //   if (!username || !email || !skills || !profession || !qualification || !mobile || !location || !linkedin || !about) {
    //     toast.warn("Please fill the form completely");
    //   } else {
    //     const reqBody = new FormData();
    //     reqBody.append("username", username);
    //     reqBody.append("email", email);
    //     reqBody.append("skills", skills);
    //     reqBody.append("profession", profession);
    //     reqBody.append("qualification", qualification);
    //     reqBody.append("mobile", mobile);
    //     reqBody.append("location", location);
    //     reqBody.append("linkedin", linkedin);
    //     reqBody.append("about", about);
    
    //     // Check if profile image is updated
    //     if (preview) {
    //       reqBody.append("profileImage", profileImage);
    //     }
    
    //     // Check if resume PDF is updated
    //     if (isPdf) {
    //       reqBody.append("resumepdf", resumepdf);
    //     }
    
    //     const token = sessionStorage.getItem("token");
    
    //     const reqHeader = {
    //       "Authorization": `Bearer ${token}`
    //     };
    
    //     try {
    //       const result = await editProfileAPI(reqBody, reqHeader);
    //       console.log(result);
    
    //       if (result.status === 200) {
    //         console.log(result.data);
    //         toast.success("Updated successfully");
    //         handleClose();
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       toast.error("Error updating profile");
    //     }
    //   }
    // };

  return (
    <>
      <div className="bg-secondary rounded-3 w-75 ms-auto me-auto mb-2">
        <div  onClick={handleShow} className="d-flex justify-content-center align-items-center ">
          <h6>Profile</h6>
          <button className="btn ">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>

      {/* edit modal */}
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
            Update your profile details
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
                    onChange={e=>setProfileDetails({...profileDetails,profileImage: e.target.files[0]})}
                    />
                    <img
                    style={{border: "5px solid #e496ef",}}
                      width={"150px"}
                      height={"150px"}
                      src={preview?preview:`${BASE_URL}/uploads/images/${profile.profileImage}`}
                      alt="no-image"
                      className=" rounded-circle shadow  "
                    />
                  </label>
                </div>

                <div className="mb-3  mt-1 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="username"
                    autoFocus
                     value={profileDetails.username}
                    onChange={(e)=>setProfileDetails({...profileDetails,username:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="email"
                    value={profileDetails.email}
                    onChange={(e)=>setProfileDetails({...profileDetails,email:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Enter your Skills"
                    value={profileDetails.skills}
                    onChange={(e)=>setProfileDetails({...profileDetails,skills:e.target.value})}
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
                        onChange={e=>setProfileDetails({...profileDetails,resumepdf: e.target.files[0]})}
                        />
                        <button
                        className="btn rounded btn-info shadow"
                        onClick={() => document.getElementById("pdfdetails").click()}
                        >
                        <i className="fa-solid fa-arrow-up-from-bracket fa-bounce me-2"></i>
                        <span id="pdfButton">{profile.resumepdf}</span>
                        </button>
                        </label>
                    </div>

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
                        onChange={(e)=>setProfileDetails({...profileDetails,profession:e.target.value})}
                      />
                 
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Educational Qualification"
                   value={profileDetails.qualification}
                   onChange={(e)=>setProfileDetails({...profileDetails,qualification:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Contact number"
                     value={profileDetails.mobile}
                     onChange={(e)=>setProfileDetails({...profileDetails,mobile:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="Location"
                     value={profileDetails.location}
                     onChange={(e)=>setProfileDetails({...profileDetails,location:e.target.value})}
                  />
                  
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded border border-2"
                    placeholder="linkedin link"
                    value={profileDetails.linkedin}
                    onChange={(e)=>setProfileDetails({...profileDetails,linkedin:e.target.value})}
                  />
                </div>

                <div>
                <textarea
                        className="form-control rounded border border-2"
                        placeholder="About You"
                        rows={3}
                        value={profileDetails.about}
                        onChange={(e) => setProfileDetails({ ...profileDetails, about: e.target.value })}
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
          <button onClick={handleUpdate} className="btn rounded-5 text-light" style={{ background: "green" }}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default EditProfile;
