import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { getProfileAPI } from "../services/allAPI";
import { BASE_URL } from "../services/baseurl";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../Components/EditProfile";
import AppliedJobs from "../Components/AppliedJobs";
import {  addProfileResponseContext } from "../Contexts/ContextShare";
import userimg from "../Assets/userplus.jpg";
import { useDispatch } from "react-redux";
import { addToHeader } from "../Redux/slices/headerSlice";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


function Dashboard() {
  const { addProfileResponse, setAddProfileResponse } = useContext(addProfileResponseContext);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [isopen, setIsOpen] = useState(false);
  // const [pro,setPro]=useState({})
  const [isProfileData, setIsProfileData] = useState({
   
  });

 
  
  console.log(isProfileData);

console.log("addproresp:",addProfileResponse);
// const getCandidateProfile = async () => {
  
//     const token = sessionStorage.getItem("token");
//     const reqHeader = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };
//     const result = await getProfileAPI(reqHeader);
//     console.log("Profile API result:", result.data);
//     setIsProfileData(result.data)
// };

// useEffect(() => {
//   getCandidateProfile();
// }, []);

const getCandidateProfile = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const result = await getProfileAPI(reqHeader);
    dispatch(addToHeader(result.data))
    console.log("Profile API result:", result.data);
    setAddProfileResponse(result.data)
    
    sessionStorage.setItem("existingPro",JSON.stringify(result.data.existingPro))

    if (Array.isArray(result.data) && result.data.length > 0) {
      setIsProfileData(result.data[0]); 
      
    } else {
      console.error("Candidate profile data is empty or undefined");
    }
  } catch (error) {
    console.error("Error fetching candidate profile:", error);
  }
};

useEffect(() => {
  getCandidateProfile();
}, []);


  // useEffect(() => {
    
  //   // setAddProfileResponse();
  // }, [addProfileResponse]);

  // onsole.log('dashbordContext:', addProfileResponse);console.log('dashbordContext:', addProfileResponse);

  // const handleLogout1 = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("existingCandidate");
  //   sessionStorage.removeItem("existingPro");
  //   navigate('/');
  // };
  const handleLogout1 = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click yes to Logout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existingCandidate");
        sessionStorage.removeItem("existingPro");
        // Navigate
        navigate('/');
  
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success"
        });
      }
    });
  };

  return (
    <>
      <Row>
        <Col md={3} className="  rounded bg-light ">
          <div style={{ width: "95%" }} className="mt-3">
            <div
              style={{ width: "100%", backgroundColor: " #f2f2f2" }}
              className=" text-center mb-3 rounded-5 ms-3 shadow border"
            >
              <div className="p-2">
                {" "}
                <h4 className="p-2 bg-info text-light rounded ">
                  Candidate Profile
                </h4>
              </div>
              <div
                style={{ width: "100%" }}
                className="d-flex justify-content-center align-items-center mt-3 "
              >
                <div
                  className="rounded-4 mt-5  shadow"
                  style={{
                    width: "80%",
                    height: "100%",
                    position: "relative",
                    background:
                      "linear-gradient(90deg, rgba(238,215,241,0.9719537473192402) 0%, rgba(226,78,235,0.9551470246301645) 1%, rgba(197,147,225,1) 100%)",
                  }}
                    >
                  <img
                    width={"150px"}
                    height={"150px"}
                    style={{ marginTop: "-60px", border: "5px solid #fff" }}
                    src={isProfileData && isProfileData.profileImage ? `${BASE_URL}/uploads/images/${isProfileData.profileImage}` : userimg}
                    alt="pic"
                    className="rounded-circle"
                  />

                  <div>
                    <h4 className=" rounded-2 mt-2  text-dark">
                      {isProfileData.username}
                    </h4>
                  </div>
                  <button className="text-dark btn btn-light rounded-5 mt-">
                    {isProfileData.profession}
                  </button>
                  <div style={{ width: "100% " }}>
                    <div className="d-flex flex-wrap justify-content-center text-align-center ms-1 mb-3">
                      {isProfileData.skills &&
                        isProfileData.skills.map((skill, index) => (
                          <button
                            style={{
                              height: "30px",
                              fontSize: "12px",
                              background: "#ae41f7",
                            }}
                            key={index}
                            className="text-light btn   rounded-5 w-25  me-2 border shadow mt-2"
                          >
                            {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <h4>
                  <Link to={isProfileData.linkein}>
                    <i class="fa-brands fa-linkedin me-3"></i>
                  </Link>
                </h4>
                <h4>
                  <Link>
                    {" "}
                    <i class="fa-brands fa-square-twitter me-3"></i>
                  </Link>
                </h4>
                <h4>
                  <a
                    href={`https://www.whatsapp.com/${isProfileData.Mobile}`}
                    target="_blank"
                  >
                    {" "}
                    <i class="fa-brands fa-square-whatsapp me-3"></i>
                  </a>
                </h4>
              </div>
              <div style={{ marginLeft: "80px" }}>
                <div className="d-flex r mt-3 ">
                  <h6 className="ms-">
                    {" "}
                    <i class="fa-solid fa-graduation-cap"></i>
                  </h6>
                  <h6 className="ms-3">{isProfileData.qualification}</h6>
                </div>
                {/* email */}
                <div className="d-flex mt-2">
                  <h6 className="ms-">
                    {" "}
                    <i class="fa-solid fa-envelope"></i>
                  </h6>
                  <h6 className="ms-3">{isProfileData.email}</h6>
                </div>
                {/* place */}
                <div className="d-flex mt-2">
                  <h6 className="ms-">
                    {" "}
                    <i class="fa-solid fa-location-dot"></i>
                  </h6>
                  <h6 className="ms-3">{isProfileData.location}</h6>
                </div>
                {/* mobile */}
                <div className="d-flex mt-2 ">
                  <h6 className="ms-">
                    {" "}
                    <i class="fa-solid fa-mobile"></i>
                  </h6>
                  <h6 className="ms-3">{isProfileData.mobile}</h6>
                </div>
                {/* space */}{" "}
                <div className="d-flex">
                  <h6 className="mt-"></h6>
                </div>
              </div>
              {/* aboutme */}
              <div className="p- text-center">
                <button
                  className="btn w-75 rounded bg-secondary mb-2"
                  onClick={() => setOpen(!open)}
                >
                  <i class="fa-regular fa-user me-3"></i>About Me{" "}
                  <i class="fa-solid text-light fa-angle-down  ms-3"></i>
                </button>
                <div className="d-flex justify-content-center align-items-center ">
                  <Collapse in={open} className="bg-info rounded w-75 mt-1">
                    <div
                      className="p-3"
                      style={{ textAlign: "center", wordWrap: "break-word" }}
                    >
                      <p className="text-center">{isProfileData.about}</p>
                    </div>
                  </Collapse>
                </div>
              </div>
              {/* cv */}
              <div className="d-flex justify-content-center align-items-center ms-auto me-auto bg-secondary w-75 rounded mb-3 mt-2">
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      `${BASE_URL}/uploads/pdfs/${isProfileData.resumepdf}`,
                      "_blank"
                    )
                  }
                >
                  Resume{" "}
                  <i className="fa-regular fa-file-pdf text-danger ms-2"></i>
                </button>
              </div>
              {/* edit profile */}
              <EditProfile profile={isProfileData} />
              {/*  */}
              {/* logout */}
              <div className="d-flex justify-content-center align-items-center ms-auto me-auto bg-success w-75 rounded mb-3 mt-3">
                <button onClick={handleLogout1} className="btn">Logout</button>
                <button className="btn ">
                  <i class="fa-regular fa-user  "></i>
                </button>
              </div>
            </div>
          </div>
        </Col>

        <Col md={9}>
          <div className="p-3  rounded-4">
            <div className="bg-info p-3 rounded-4 d-flex ms-2  ">
              <h4 className="text-light ">
                <i class="fa-solid fa-layer-group me-3"></i>Your Applications
              </h4>
                <Link to={'/jobs'}>
                <button style={{marginLeft:"400px"}} className="btn fs-6 text-light border rounded-5 border- border-2 ">More Jobs<i class="fa-solid fa-up-right-from-square  ms-2"></i></button>
  
                </Link>             
                 <div className="d-flex ms-auto w-25">
                <input
                  type="text"
                  className="form-control rounded-5"
                  placeholder="Search jobs by name"
                />
                <i
                  style={{ marginLeft: "-45px", color: "grey" }}
                  class="fa-solid fa-magnifying-glass fa-rotate-90"
                ></i>
              </div>
            </div>
            {/* job cards */}
            <Row>
              <Col md={8} className="">
                <div className="ms-3 mt-3">
                <Link className="text-warning" to={'/payment'}><h5>Chat with recruiters? Upgrade to premium<i class="fa-solid fa-crown fa-lg ms-2" style={{color:"#825dee"}}></i></h5></Link>
                  </div>
                <AppliedJobs/>
              </Col>
              {/* notofication */}
              <Col
                md={4}
                style={{ height: "100%" }}
                className="mt-4 p-4 rounded-4 bg-light"
              >
                <div className="p text-center">
                  <h5 onClick={() => setIsOpen(!isopen)}>
                    <i class="fa-regular fa-bell me-3"></i>Notifications{" "}
                    <i class="fa-solid fa-angles-down fa-beat ms-3"></i>
                  </h5>
                  <Collapse in={isopen} className="bg-info rounded">
                    <div className="p-3">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ullam quod ab recusandae error expedita iste amet
                        beatae optio deleniti nobis adipisci ex odit odio iusto
                        at libero.{" "}
                      </p>
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
