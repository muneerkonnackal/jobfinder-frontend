import React, { useContext, useEffect, useState } from "react";
import Jobcard from "../Components/Jobcard";
import { Col, Row } from "react-bootstrap";
import Header from "../Components/Header";
import { allJobsAPI } from "../services/allAPI";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../services/baseurl";
import { Link } from "react-router-dom";
import moment from "moment";
import JobApplication from "../Components/JobApplication";
import Pagination from "react-bootstrap/Pagination";
import { Dropdown } from 'react-bootstrap';
import { addProfileResponseContext } from "../Contexts/ContextShare";
import ReportJob from "../Components/ReportJob";
import Footer from "../Components/Footer";



function JobPage() {
  const { addProfileResponse, setAddProfileResponse } = useContext(
    addProfileResponseContext
  );
  console.log("addproresp:", addProfileResponse);
  const [allJobs, setAllJobs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isToken, setIsToken] = useState(false);

  const sortedJobs = [...allJobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // pagination
  // const [pageData, setPageData] = useState([]);

  // const [page, setPage] = useState(1);
  // const [pageCount, setPageCount] = useState(0);
  // console.log(pageCount);
  // dropdown
  const [showDropdowns, setShowDropdowns] = useState([]);

  const handleDropdownToggle = (index) => {
    const updatedShowDropdowns = [...showDropdowns];
    updatedShowDropdowns[index] = !updatedShowDropdowns[index];
    setShowDropdowns(updatedShowDropdowns);
  };



  const getAllJobs = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      };
      const result = await allJobsAPI(searchKey, reqHeader);
      console.log(result.data);
      setAllJobs(result.data);
    }
  };
  console.log(searchKey);

  // //:handle next
  // const handleNext = () => {
  //   if (page === pageCount) return page;
  //   setPage(page + 1);
  // };

  // //:handlePrevious
  // const handlePrevious = () => {
  //   if (page === 1) return page;
  //   setPage(page - 1);
  // };

  useEffect(() => {
    getAllJobs();
  }, [searchKey]); //page inside dependeny

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true);
    }
  }, []);

  // useEffect(() => {
  //   const pageDataCount = Math.ceil(allJobs.length / 6);
  //   setPageCount(pageDataCount);

  //   if (page) {
  //     const LIMIT = 6;
  //     const skip = LIMIT * page;
  //     const dataskip = allJobs.slice(page === 1 ? 0 : skip - LIMIT, skip);
  //     setPageData(dataskip);
  //   }
  // }, [allJobs]);

  // useEffect(() => {
  //   const pageDataCount = Math.ceil(allJobs.length / 6);
  //   setPageCount(pageDataCount);
  
  //   const LIMIT = 6;
  //   const skip = LIMIT * (page - 1); // Adjust to zero-indexed page number
  //   const dataskip = allJobs.slice(skip, skip + LIMIT);
  //   setPageData(dataskip);
  // }, [allJobs, page]);

  const handleButtonClick = (query) => {
    setSearchKey(query);
  };

  return (
    <>
      <div className="w-100">
        <Row className=" m-2">
          <Header />
          <Col md={3} className=" bg-light">
            <div className="d-flex justify-content   flex-column mt-4">
              <h4>Find More</h4>
              <div className="d-flex justify-content-center me-4">
                <input
                  type="text"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="form-control border border-secondary rounded border-3"
                  placeholder="Search the Jobs, location,"
                />
                <i
                  style={{ marginLeft: "-45px", color: "lightgrey" }}
                  class="fa-solid fa-magnifying-glass fa-rotate-90"
                ></i>
              </div>
              <div className="mt-5 ms-3 mb-4 d-flex flex-column ">
                <h4>Popular Searches</h4>

                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn   w-100 text-light border rounded"
                    onClick={() => handleButtonClick("Developer")}
                  >
                    {" "}
                    Developer{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>
                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2  w-100 text-light border rounded"
                    onClick={() => handleButtonClick("ui/ux")}
                  >
                    {" "}
                    UI/UX Designer{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>
                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2   w-100 text-light border rounded"
                    onClick={() => handleButtonClick("Fresher")}
                  >
                    {" "}
                    Fresher Jobs{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>
                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2  w-100 text-light border rounded"
                    onClick={() => handleButtonClick("Bangalore")}
                  >
                    {" "}
                    Bangalore{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>

                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2  w-100 text-light border rounded"
                    onClick={() => handleButtonClick("Chennai")}
                  >
                    {" "}
                    Chennai{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>

                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2   w-100 text-light border rounded"
                    onClick={() => handleButtonClick("Kochi")}
                  >
                    {" "}
                    Kochi{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>

                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2  w-100 text-light border rounded"
                    onClick={() => handleButtonClick("B.Tech")}
                  >
                    {" "}
                    B.Tech{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>

                <div >
                  <button
style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
className="btn mt-2  border text-light w-100 rounded"
                    onClick={() => handleButtonClick("workfromhome")}
                  >
                    {" "}
                    Work From Home{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>

                <div>
                  <button
                  style={{ height: "60px", backgroundImage: "linear-gradient(90deg, #AB40E9FF 0%, #71C4FFFF 100%)",marginLeft:"-15px" }}
                    className="btn mt-2  w-100 border text-light rounded"
                    onClick={() => handleButtonClick("Intern")}
                  >
                    {" "}
                    Internship{" "}
                    <i class="fa-solid fa-arrow-up-right-from-square  ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <h1 className="text-primary text-center mt-1">All Jobs</h1>

              {sortedJobs?.length > 0 ? (
                sortedJobs.map((item , index) => (
                  <Col md={4} className="mt-3 me- ms-">
                    <div className="">
                      <Card
                        className="rounded shadow mb-4 "
                        style={{ width: "18rem" }}
                      >
                        <div className="d-flex justify-content-between ">
                          <Card.Img
                            width={"50px"}
                            className="w-25 mt-3 ms-3 rounded-2 shadow border"
                            height={"70px"}
                            variant="top"
                            src={`${BASE_URL}/uploads/${item.companylogo}`}
                            alt="No-Image"
                          />
                          <div className="d-flex ">
                            <h6 className="mt-3 me-3 text-secondary">
                              {moment(item.createdAt).fromNow()}
                            </h6>
                            
                            <Dropdown 
                          show={showDropdowns[index]} // Use state for each card
                          onToggle={() => handleDropdownToggle(index)} // Pass the index to the function
                        >
                          <Dropdown.Toggle
                           id="dropdown-basic"
                            variant="white"
                            className="btn  justify-content-between mt-1 no-caret border rounded-2 bg-white border" 
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu   className="rounded shadow border">
                           <ReportJob data = {item} />
                            <Dropdown.Item><button className='btn btn-primary rounded  w-100 bg-primary '>Rate</button></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                          </div>
                        </div>
                        <Card.Body>
                          <Card.Title
                            style={{ color: "blue" }}
                            className=" fs-4"
                          >
                            {item.position}
                          </Card.Title>
                          <Card.Text>
                            <h6 style={{ marginTop: "-8px", color: "green" }}>
                              {item.company}
                            </h6>
                            <h6>
                              Location :{" "}
                              <span className="">{item.location}</span>
                            </h6>
                            <h6>Qualification: {item.qualification}</h6>
                            <h6>Experience: {item.typeofworker}</h6>
                            <h6>Job Type : {item.worktype}</h6>
                            <h6>Expected Salary : ₹{item.expsalary}</h6>
                            <h6>Last date : {item.lastdate}</h6>
                          </Card.Text>
                          <Link to={"/userlogin"}>
                            {" "}
                            <JobApplication jobData={item} />
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))
              ) : (
                <div>
                  {isToken ? (
                    <p className="text-danger fs-4 text-center">
                      Sorry No Jobs currently available
                    </p>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <div className="text-center">
                        <img
                          src="https://cdn.dribbble.com/users/2234430/screenshots/8587843/media/5a7b6b3be7edd17ae98a25d010277e62.gif"
                          className="rounded-circle"
                          height={"250px"}
                          width={"250px"}
                          alt="no-image"
                        />
                        <p className="text-danger fs-5 mt-4">
                          Please{" "}
                          <Link
                            to={"/login"}
                            style={{ textDecoration: "none" }}
                          >
                            Login
                          </Link>{" "}
                          to view more Jobs
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Row>
            <div className="d-flex justify-content-center align-items-center">

{/*           
            <Pagination className="custom-pagination">
  <Pagination.Prev
    onClick={handlePrevious}
    disabled={page === 1}
    className="page-item prev-next"
  >
    <span className="page-link">&lt;</span>
  </Pagination.Prev>
  {Array.from({ length: Math.min(pageCount, 5) }, (_, index) => {
    const pageToShow = page <= 3 ? index + 1 : page - 3 + index;
    return (
      <Pagination.Item
        key={index}
        active={page === pageToShow}
        onClick={() => setPage(pageToShow)}
        className="page-item"
      >
        <span className="page-link">{pageToShow}</span>
      </Pagination.Item>
    );
  })}
  <Pagination.Next
    onClick={handleNext}
    disabled={page === pageCount}
    className="page-item prev-next"
  >
    <span className="page-link">&gt;</span>
  </Pagination.Next>
</Pagination> */}

            
            </div>
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  );
}

export default JobPage;
