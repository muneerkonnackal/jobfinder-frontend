import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Jobcard from "../Components/Jobcard";
import CandidateProfile from "../Components/CandidateProfile";
import "animate.css";
import { homeJobsAPI, homeProfilesAPI } from "../services/allAPI";
import Footer from "../Components/Footer";
import meta from '../Assets/logo-Meta.png'
import tcs from '../Assets/TCS.NS_BIG.png'
import micro from '../Assets/microsoft.png'
import ibm from '../Assets/ibm.png'
import netflix from '../Assets/netflix.png'
import cisco from '../Assets/cisco-logo.png'
import google from '../Assets/google-logo-1.png'
import prime from '../Assets/prime.png'
import techm from '../Assets/Tech_Mahindra-Logo.wine.png'


function Home() {
  
  // console.log(addProfileResponse);
  //state to store token
  const [isLogin, setIsLogin] = useState(false);
  const [iscandidate, setIsCandidate] = useState({});
  const [isAdmin, setIsAdmin] = useState({});

  //*store candidateProfile for conditional rendering
  const [isProfile, setIsProfile] = useState(false);

  // useEffect(() => {
  //   setIsProfile(sessionStorage.getItem("existingProfile"));
  // }, []);

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     setIsLogin(sessionStorage.getItem("token"));
  //   }
  // }, []);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    try {
      if (storedToken) {
        setIsLogin(JSON.parse(storedToken));
      }
    } catch (error) {
      console.error("Error parsing stored token:", error);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("existingCandidate")) {
      setIsCandidate(JSON.parse(sessionStorage.getItem("existingCandidate")));
    }
  }, []);

  console.log(iscandidate);
  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     setIsLogin(sessionStorage.getItem("token"));
  //   }
  // }, []);

  useEffect(() => {
    if (sessionStorage.getItem("existingAdmin")) {
      setIsAdmin(JSON.parse(sessionStorage.getItem("existingAdmin")));
    }
  }, []);

  //: get home jobs
  const [homeJobs, setHomeJobs] = useState([]);

  const sortedJobs = [...homeJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getHomeJobs = async () => {
    const result = await homeJobsAPI();
    console.log(result);
    setHomeJobs(result.data);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(sessionStorage.getItem("token"));
    } else {
      setIsLogin("");
    }
  }, []);
  // console.log(isLogin);

  useEffect(() => {
    getHomeJobs();
  }, []);

  console.log(`is candidate: ${iscandidate}`);

  //getProfiles for deciding if user fill their reg form completely and add reg details
  const [homeProfiles, setHomeProfiles] = useState([]);
  const [candidateInProfiles, setCandidateInProfiles] = useState(null);
  const [loading, setLoading] = useState(true);

  const getHomeProfiles = async () => {
    try {
      const result = await homeProfilesAPI();
      console.log(result);
      setHomeProfiles(result.data);
      // setAddProfileResponse(result.data)
    } catch (error) {
      console.error("Error fetching home profiles:", error);
    }
  };

  useEffect(() => {
    getHomeProfiles();
  }, [homeProfiles]);

  useEffect(() => {
    const isCandidateId = iscandidate.email;

    if (isCandidateId && homeProfiles.length > 0) {
      const candidateInProfiles = homeProfiles.find(
        (profile) => profile.email === isCandidateId
      );

      if (candidateInProfiles) {
        console.log("Candidate found in homeProfiles:", candidateInProfiles);
        setCandidateInProfiles(candidateInProfiles);
      } else {
        console.log("Candidate not found in homeProfiles.");
        setCandidateInProfiles(null);
      }

      setLoading(false);
    }
  }, [iscandidate, homeProfiles]);

  console.log("homeProfiles:", homeProfiles);
  console.log("iscandidateid", iscandidate._id); 

  return (
    <>
      <div  style={{ width: "100%", height: "100vh", backgroundImage: "linear-gradient(135deg, #ABDCFF 30%, #0396FF 100%)" }}>

        <div className="container-fluid rounded">
          <Row className="align-items-center p-5">
            <Col md={6}>
              <h1 className="text-primary mt-5 " style={{ fontSize: "80px" }}>
                JOB FINDER
              </h1>
              <p className="text-dark fs-4">
                Connect, collaborate, and climb. Your career success starts with
                a community.
              </p>

              {!isLogin ? (
                <div className="d-flex w-100  flex-column">
                  <p className="text-black">
                    Looking for new opportunities? Register as a candidate
                  </p>
                  <Link to={"/userlogin"}>
                    <button className="btn btn-grad w-25  btn-primary rounded-5 shadow border">
                      {" "}
                      Candidate<i class="fa-solid fa-right-long ms-3"></i>
                    </button>
                  </Link>
                  <p className="mt-3 text-black">
                    Searching for exceptional talent? Register as a recruiter.
                  </p>
                  <Link to={"/adminlogin"}>
                    <button className="btn btn-grad w-25 btn-primary  rounded-5 shadow border">
                      Recruiter<i class="fa-solid fa-right-long ms-3"></i>
                    </button>

                    
                  </Link>
                </div>
              ) : (
                <div>
                  {sessionStorage.getItem("existingAdmin") ? (
                    <div>
                      <p className="mt-3 text-black fs-1">
                        Welcome{" "}
                        <span className="text-warning ">
                          {isAdmin.username.charAt(0).toUpperCase() +
                            isAdmin.username.substring(1)}
                        </span>
                      </p>
                      {isAdmin.email === "www.adminjobHub123@gmail.com" ||
                      "www.adminJobFinder@gmail.com" ? (
                        <Link
                          to={"/admin"}
                          className="btn w-25 btn-primary  rounded-5 shadow border"
                        >
                          DashBoard
                          <i class="fa-solid fa-right-long fa-fade ms-3"></i>
                        </Link>
                      ) : (
                        <Link
                          to={"/admindashboard"}
                          className="btn w-25 btn-primary  rounded-5 shadow border"
                        >
                          DashBoard
                          <i class="fa-solid fa-right-long fa-fade ms-3"></i>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h1
                        style={{ fontSize: "45px" }}
                        className="animate__animated animate__backInRight"
                      >
                        Welcome{" "}
                        <span className="text-warning ">
                          {iscandidate.username.charAt(0).toUpperCase() +
                            iscandidate.username.substring(1)}
                        </span>
                      </h1>

                      {candidateInProfiles ? (
                        <Link
                          to={"/Dashboard"}
                          className="btn mt-3 btn-primary rounded-5 shadow border"
                        >
                          Dashboard{" "}
                          <i className="fa-solid fa-right-long fa-fade ms-3"></i>
                        </Link>
                      ) : (
                        <CandidateProfile />
                      )}
                    </div>
                  )}
                </div>
              )}
            </Col>
            <Col md={6} style={{ marginTop: "100px" }}>
              <img
                className="w-100 rounded-5"
                src="https://i0.wp.com/tinyeye.com/wp-content/uploads/2021/02/career-img.png?resize=1024%2C663&ssl=1"
                alt="No-image"
              />
            </Col>
          </Row>
          {/* logos */}
          <Row>
            <Col className="d-flex flex-column" md={12}>
              <div  >
                <h6 className="" style={{marginTop:"-60px",marginLeft:"50px",color:"grey",opacity:'.8'}}><u>TRUSTED PARTNERS</u></h6>
              </div>
              
              <div style={{marginTop:"-29px"}} className="logos mb-5  d-flex justify-content-evenly align-items-center">
               
                <img width={60} className="" src={meta} alt="No Logo" />
                <img width={100} className="" src={google} alt="No Logo" />
                
                <img width={130} className="" src={tcs} alt="No Logo" />
                <img width={80} className="" src={ibm} alt="No Logo" />
                <img width={70}  style={{
    filter: 'brightness(1.1) contrast(.8) saturate(1) hue-rotate(20deg)',
  }} className="" src={prime} alt="No Logo" />
                <img width={130} className="" src={micro} alt="No Logo" />
                <img width={110} className="" src={techm} alt="No Logo" />
                <img width={80} className="" src={cisco} alt="No Logo" />
                <img width={80} className="" src={netflix} alt="No Logo" />

              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="all-project mt-5">
        <div className="text-center">
          <h1>
            <u>Featured Jobs</u>
          </h1>

          <marquee scrollAmount={5} className="mt-5">
            <div className="d-flex gap-2">
              {sortedJobs?.length > 0
                ? sortedJobs.map((item) => (
                    <div className="ms-5" style={{ width: "500px" }}>
                      <Jobcard job={item} />
                    </div>
                  ))
                : null}
            </div>
          </marquee>

          <div className="text-center mt-5 mb-5">
            <h6>
              {!isLogin ?
                <Link to={"/userlogin"} style={{ color: "green" }}>
                See more Jobs
              </Link>
              :
              <Link to={"/jobs"} style={{ color: "green" }}>
                See more Jobs
              </Link>
              }
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
