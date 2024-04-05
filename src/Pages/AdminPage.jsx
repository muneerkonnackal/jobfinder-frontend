import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../services/baseurl";
import userimg from "../Assets/userplus.jpg";
import TextField from "@mui/material/TextField";
import { editAdminProfileAPI } from "../services/allAPI";
import SuperProfiles from "../Components/SuperProfiles";
import SuperRecruiters from "../Components/SuperRecruiters";
import chartGif from "../Assets/data_visualization_by_jardson_almeida_2.gif";
import chartgif2 from "../Assets/rotation05.gif";
import SuperComplaint from "../Components/SuperComplaint";
import SuperOffer from "../Components/SuperOffer";
import SuperTransaction from "../Components/SuperTransaction";
import SuperPremium from "../Components/SuperPremium";
import Charts from "../Components/Charts";
import Chart2 from "../Components/Chart2";
import Footer from "../Components/Footer";

function AdminPage() {
  const [superAdminProfile, setSuperAdminProfile] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    designation: "",
    profile: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  //*Once an image is uploaded then that image will be stored in existing image
  const [existingImage, setExistingImage] = useState("");
  //*to hold the url of the new image
  const [preview, setPreview] = useState("");
  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("existingAdmin"));

    setSuperAdminProfile({
      ...superAdminProfile,
      username: admin.username,
      email: admin.email,
      password: admin.password,
      company: admin.company,
      designation: admin.designation,
      profile: "",
    });

    setExistingImage(admin.profile);
  }, [isUpdate]);

  useEffect(() => {
    if (superAdminProfile.profile) {
      setPreview(URL.createObjectURL(superAdminProfile.profile));
    } else {
      setPreview("");
    }
  }, [superAdminProfile.profile]);
  console.log(superAdminProfile);

  // : date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //* Format the date and time
  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentDateTime.toLocaleDateString();

  const handleAdminProfileUpdate = async () => {
    const { username, email, password, company, designation, profile } =
      superAdminProfile;

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
  useEffect(() => {}, [handleAdminProfileUpdate]);
  return (
    <>
      <Header adminPage />
      <div>
        <Row>
          <Col md={3}>
            <div className="card rounded-3 shadow p-4 mb-3 mt-5">
              <div className=" text-center">
                <h4 className="text-primary">Super Admin Profile</h4>
              </div>

              <div className="row justify-content-center ">
                <label htmlFor="profile" className="mb-3 text-center">
                  <input
                    id="profile"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setSuperAdminProfile({
                        ...superAdminProfile,
                        profile: e.target.files[0],
                      })
                    }
                  />

                  {existingImage == "" ? (
                    <img
                      width={"150px"}
                      height={"150px"}
                      src={preview ? preview : userimg}
                      alt="no-image"
                      className="rounded-circle"
                    />
                  ) : (
                    <img
                      width={"120px"}
                      height={"120px"}
                      src={
                        preview
                          ? preview
                          : `${BASE_URL}/uploads/${existingImage}`
                      }
                      alt="no-image"
                      className="rounded-circle"
                    />
                  )}
                </label>
                <div>
                  <h3 className="text-center text-dark rounded mb-">
                    {superAdminProfile.username
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h3>
                </div>
                <div className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    type="text"
                    className="form-control  text-center rounded-3 "
                    placeholder="Company Name"
                    value={superAdminProfile.company}
                    onChange={(e) =>
                      setSuperAdminProfile({
                        ...superAdminProfile,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3 ">
                  <TextField
                    id="outlined-basic"
                    label="Designation"
                    variant="outlined"
                    type="text"
                    className="form-control text-center rounded-3 "
                    placeholder="Designation"
                    value={superAdminProfile.designation}
                    onChange={(e) =>
                      setSuperAdminProfile({
                        ...superAdminProfile,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className=" mt-">
                  <button
                    onClick={handleAdminProfileUpdate}
                    className="btn btn-success rounded w-100"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className=""></div>

            <div className="text-center m">
              <p
                className="text-primary"
                style={{ fontSize: "24px", marginBottom: "5px" }}
              >
                {formattedTime}
              </p>
              <p style={{ fontSize: "22px" }}>{formattedDate}</p>
            </div>

            <div />

            {/* <div>
            <h6>a</h6>
          </div> */}
          </Col>
          <Col md={9}>
            <div className="d-flex  ">
              <div style={{ width: "300px" }} className="me-4 mt-4">
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-solid fa-users me-1 ms-2"></i> All Candidates
                  </h5>
                  <SuperProfiles />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-solid fa-user-tie ms-2 me-"></i> All Recruiters
                  </h5>
                  <SuperRecruiters />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-solid fa-crown ms-2 me-1"></i>Premium Users
                  </h5>
                  <SuperPremium />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-brands fa-cc-paypal me-1"></i>All Transactions
                  </h5>
                  <SuperTransaction />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-solid fa-circle-exclamation me-1"></i>Complaint
                    Box
                  </h5>
                  <SuperComplaint />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-solid fa-money-check-dollar me-1"></i>
                    Subscriptions
                  </h5>
                  <SuperOffer />
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(246,174,235,0.9579481450783438) 0%, rgba(135,150,248,1) 100%)",
                  }}
                  className="border mb-3 mt-4 w-100 d-flex justify-content-between align-items-center  p-2 rounded  shadow "
                >
                  <h5>
                    <i class="fa-regular fa-comments me-1"></i>Notifications
                  </h5>
                  <button className="btn rounded btn-primary ms- ">
                    Update
                  </button>
                </div>
              </div>
              <div className="mt-4 mb-5 d-flex justify-content-center text-light align-items-center">
                <div className="ms-3" style={{ width: "700px" }}>
                  {/* <img src={chartGif} className='mt-4 me- '  height={530} width={790} alt="" /> */}
                  <div className="d-flex justify-content-between align-items-center mb-5 mt-4">
                    <div
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)",
                      }}
                      className="d-flex  text-center flex-column border p-4 bg-info rounded-3 shadow"
                    >
                      <h2 className="fw-bold">10000</h2>
                      <h6>PLACEMENTS</h6>
                    </div>

                    <div
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)",
                      }}
                      className="d-flex text-center flex-column border p-4 bg-info rounded-3 shadow"
                    >
                      <h2 className="fw-bold">500K</h2>
                      <h6>CANDIDATES</h6>
                    </div>

                    <div
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)",
                      }}
                      className="d-flex text-center flex-column border p-4 bg-info rounded-3 shadow"
                    >
                      <h2 className="fw-bold">20K</h2>
                      <h6>COMPANIES</h6>
                    </div>

                    <div
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)",
                      }}
                      className="d-flex text-center flex-column border p-4 bg-info rounded-3 shadow"
                    >
                      <h2 className="fw-bold">1000</h2>
                      <h6>START-UP'S</h6>
                    </div>
                  </div>

                  <div className="mt-5 mb-3 ">
                    <Charts />
                  </div>

                  {/* <div className=' w-100 mt-4 mb-5'>
                  <Chart2/>
                </div> */}
                </div>
                <div></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default AdminPage;
