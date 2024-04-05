import React, { useContext, useEffect, useState } from "react";
import {  Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../services/baseurl";
import userimg from "../Assets/user2.jpeg";
import { adminJobsAPI, deleteJobsAPI, editAdminProfileAPI } from "../services/allAPI";
import Header from "./Header";
import Charts from "./Charts";
import PostJob from "./PostJob";

import Button from 'react-bootstrap/Button';
import EditJob from "./EditJob";
import { addJobResponseContext, editJobResponseContext, profileEditResponseContext } from "../Contexts/ContextShare";
import ApplicantsAdmin from "./ApplicantsAdmin";
import { Link } from "react-router-dom";
import jobaddanimation from '../Assets/addjobs.gif'
import { TextField } from "@mui/material";


function AdminDashboard() {
  const {addJobResponse, setAddJobResponse} = useContext(addJobResponseContext)
  const { editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
  const {editProfileResponse, setEdipProfileResponse} = useContext(profileEditResponseContext)

  const [adminProfile, setAdminProfile] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    designation: "",
    profile: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [userJob,setUserJob] = useState([])
  //*Once an image is uploaded then that image will be stored in existing image
  const [existingImage, setExistingImage] = useState("");
  //*to hold the url of the new image
  const [preview, setPreview] = useState("");
  // useEffect(() => {
  //   const admin = JSON.parse(sessionStorage.getItem("existingAdmin"));

  //   setAdminProfile({
  //     ...adminProfile,
  //     username: admin.username,
  //     email: admin.email,
  //     password: admin.password,
  //     company: admin.company,
  //     designation: admin.designation,
  //     profile: "",
  //   });

  //   setExistingImage(admin.profile);
  // }, [isUpdate]);
  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("existingAdmin"));
  
    setAdminProfile({
      ...adminProfile,
      username: admin.username,
      email: admin.email,
      password: admin.password,
      company: admin.company,
      designation: admin.designation,
      profile: "",
    });
  
    // Conditionally set existingImage based on whether there is an existing image
    setExistingImage(admin.profile || "");
  
  }, [isUpdate]);

  useEffect(() => {
    if (adminProfile.profile) {
      setPreview(URL.createObjectURL(adminProfile.profile));
    } else {
      setPreview("");
    }
  }, [adminProfile.profile]);
  console.log(adminProfile);

  const handleProfileUpdate = async () => {
    const { username, email, password, company, designation, profile } =
      adminProfile;

    if (!company || !designation) {
      toast.warn("please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("company", company);
      reqBody.append("designation", designation);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingImage);

      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await editAdminProfileAPI(reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          toast.success("Profile updated successfully");
          setEdipProfileResponse(result.data)
          sessionStorage.setItem("existingAdmin", JSON.stringify(result.data));
          setIsUpdate(true);
        } else {
          console.log(result.response.data);
        }
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await editAdminProfileAPI(reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          toast.success("Profile updated successfully");
          setEdipProfileResponse(result.data)
          sessionStorage.setItem("existingAdmin", JSON.stringify(result.data));
          setIsUpdate(true);
        } else {
          console.log(result.response.data);
        }
      }
    }
  };
  console.log("existingImage:", existingImage);
  console.log("preview:", preview);

//:get User posts



const getAdminJobs = async()=>{


 const token = sessionStorage.getItem("token")

 const reqHeader = {
   "Content-Type":"application/json",
   "Authorization" : `Bearer ${token}` 
 }

 const result = await adminJobsAPI(reqHeader)
 console.log(result.data);
 setUserJob(result.data)


}

useEffect(()=>{
 getAdminJobs()
},[addJobResponse , editJobResponse])


const handleDelete=async(id)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type":"application/json",
    "Authorization" : `Bearer ${token}` 
  }

  const result = await deleteJobsAPI(id,reqHeader)
  console.log(result);
  //after done by backend
  if(result.status===200){
    toast.error("Successfully deleted")
    getAdminJobs()

  }
  else{
    alert(result.response.data)
  }
}

  return (
    <>
      <Header admindashboard />
      <Row className="ms-2">
        <Col md={3} className="rounded bg-light">
          <div className="card rounded-3 shadow p-4 mb- mt-3">
            <div className=" text-center">
              <h4>HR Profile</h4>
            </div>

            <div className="row justify-content-center mt-2">
              <label htmlFor="profile" className="mb-3 text-center">
                <input
                  id="profile"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setAdminProfile({
                      ...adminProfile,
                      profile: e.target.files[0],
                    })
                  }
                />

                {existingImage == ""  ? (
                  <img
                    width={"150px"}
                    height={"150px"}
                    src={preview?preview:userimg}
                    alt="no-image"
                    className="rounded-circle"
                  />
                ) : (
                  <img
                    width={"120px"}
                    height={"120px"}
                    src={
                      preview ? preview : `${BASE_URL}/uploads/${existingImage}`
                    }
                    alt="no-image"
                    className="rounded-circle"
                  />
                )}
              </label>
              <div>
                <h3 className="text-center text-dark rounded mb-">
                  {adminProfile.username
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>
              </div>
              <div className="mb-3">
                <TextField id="outlined-basic" label="Company" variant="outlined"
                  type="text"
                  className="form-control  text-center rounded-3 "
                  placeholder="Company Name"
                  value={adminProfile.company}
                  onChange={(e) =>
                    setAdminProfile({
                      ...adminProfile,
                      company: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3 ">
                <TextField id="outlined-basic" label="Designation" variant="outlined"
                  type="text"
                  className="form-control text-center rounded-3 "
                  placeholder="Designation"
                  value={adminProfile.designation}
                  onChange={(e) =>
                    setAdminProfile({
                      ...adminProfile,
                      designation: e.target.value,
                    })
                  }
                />
              </div>

              <div className=" mt-">
                <button
                  onClick={handleProfileUpdate}
                  className="btn btn-success rounded w-100"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="">
          <PostJob/>
          </div>
          
          <div />
        </Col>
        
        <Col md={6}>
        
          {/* <>
          <Row>
            <Charts />
            </Row>
         
          </> */}

          <div className="mt-3">
            <h3 className="fw-bold text-center mb-3">YOUR POSTS</h3>
           
            {userJob.length>0?
  userJob?.map((item) => (
    <Row key={item.id} className="border-secondary border-3 ms-3 mb-4 bg-light border shadow rounded-4 p-3">
      <Col md={4} className="">
        <img
          style={{ marginLeft: "-12px" }}
          className="border rounded-4"
          src={`${BASE_URL}/uploads/${item.companylogo}`}
          width={"100%"}
          height={"155px"}
          alt=""
        />
      </Col>
      <Col md={4} className="mt-2">
        <h4>{item.position}</h4>
        <div className="d-flex ">Company: {item.company}</div>
        <h6>Job Type: {item.worktype}</h6>
        <h6>Last date : {item.lastdate}</h6>
       <ApplicantsAdmin data = {item}/>
      </Col>
      <Col md={4} className="mt-2 ">
        <h6 className="">Exp salary:{item.expsalary}</h6>
        <h6 className="">Experience:{item.typeofworker}</h6>
        <h6 className="">Qualification:{item.qualification}</h6>
        <div className="d-flex justify-content-evenly me-5 mt-3">
          <EditJob job = {item} />
          <button onClick={()=>handleDelete(item._id)} className="btn  border border-danger rounded w-25">
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
          
        </div>
        
      </Col>
    </Row>
  )):
  <div style={{marginTop:"100px"}} className='d-flex flex-column  justify-content-center align-items-center'>
  <h2>You didnt post anything!!!</h2>
  <img width={'250px'} src={jobaddanimation} alt="" />
  <h4 className=' '>Post Your Jobs</h4>
  </div> }
 

          </div>
         
        </Col>
      </Row>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
    
  );
}

export default AdminDashboard;
