import React, { useEffect, useState } from 'react';
import { editAdminOffersAPI, getOffersAPI } from '../services/allAPI';
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";
import { BASE_URL } from '../services/baseurl';
import offerimg from "../Assets/offer2.jpg";

function EditOffers() {
  const [getOffer, setGetOffer] = useState({});
  const [eximg, setExImg] = useState("");
  const [isoffer, isSetOffer] = useState({
    _id: '',
    offerImage: '',
    url: '',
    basicPlan: '',
    standardPlan: '',
    classicPlan: '',
  });
  const [ispreview, setisPreview] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOffersAPI();
        console.log(result);
        setGetOffer(result.data);
        if (result.data && result.data.offerImage) {
          setExImg(result.data.offerImage);
        }
      } catch (error) {
        console.error("Error fetching offers", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    isSetOffer({
      _id: getOffer._id,
      url: getOffer.url,
      basicPlan: getOffer.basicPlan,
      standardPlan: getOffer.standardPlan,
      classicPlan: getOffer.classicPlan,
    });
  }, [getOffer]);

  useEffect(() => {
    if (isoffer.offerImage) {
      setisPreview(URL.createObjectURL(isoffer.offerImage));
    }
  }, [isoffer.offerImage]);

  const handleClose1 = () => {
    isSetOffer({
      _id: getOffer._id,
      url: getOffer.url,
      basicPlan: getOffer.basicPlan,
      standardPlan: getOffer.standardPlan,
      classicPlan: getOffer.classicPlan
    });
    setisPreview("");
  }

  const handleOfferUpdate = async () => {
    const { _id, offerImage, url, basicPlan, standardPlan, classicPlan } = isoffer;

    if (!basicPlan || !standardPlan || !classicPlan) {
      toast.warn("Please fill the form Completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("_id", _id);

      if (ispreview) {
        reqBody.append("offerImage", offerImage);
      } else {
        reqBody.append("offerImage", eximg);
      }

      reqBody.append("url", url);
      reqBody.append("basicPlan", basicPlan);
      reqBody.append("standardPlan", standardPlan);
      reqBody.append("classicPlan", classicPlan);

      const reqHeader = ispreview
        ? {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

      try {
        const result = await editAdminOffersAPI(reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          toast.success("Offer updated successfully");
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error("Error updating offer", error);
      }
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-success rounded">Update</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        scrollable
        style={{ border: "none" }}
        className="rounded-5 "
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 mt-1">
            <Col md={4}>
              <label
                htmlFor="editoffer"
                style={{ width: "100%" }}
                className="p-3  d-flex justify-content-center  flex-column "
              >
                <div>
                  <h5 className="text-center mt-t mb-3">Offer Image Banner</h5>
                </div>
                <div className="text-center">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="editoffer"
                    onChange={(e) =>
                      isSetOffer({
                        ...isoffer,
                        offerImage: e.target.files[0],
                      })
                    }
                  />
                  {eximg === 'someValue' ? (
                    <img
                      style={{ border: "5px solid #e496ef" }}
                      width={"150px"}
                      height={"150px"}
                      src={ispreview ? ispreview : offerimg}
                      alt="no-image"
                      className="rounded-circle shadow"
                    />
                  ) : (
                    <img
                      style={{ border: "5px solid #e496ef" }}
                      width={"150px"}
                      height={"150px"}
                      src={ispreview ? ispreview : `${BASE_URL}/uploads/${getOffer?.offerImage}`}
                      alt="no-image"
                      className="rounded-circle shadow"
                    />
                  )}
                </div>
              </label>
            </Col>
            <Col md={8}>
              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="URL of Youtube Video"
                autoFocus
                value={isoffer.url}
                onChange={(e) => isSetOffer({ ...isoffer, url: e.target.value })}
              />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Basic Plan In Rupees Per Month"
                autoFocus
                value={isoffer.basicPlan}
                onChange={(e) =>
                  isSetOffer({
                    ...isoffer,
                    basicPlan: e.target.value
                  })
                }
              />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Standard Plan In Rupees Per Month"
                autoFocus
                value={isoffer.standardPlan}
                onChange={(e) =>
                  isSetOffer({
                    ...isoffer,
                    standardPlan: e.target.value,
                  })
                }
              />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Classic Plan In Rupees Per Year"
                autoFocus
                value={isoffer.classicPlan}
                onChange={(e) =>
                  isSetOffer({
                    ...isoffer,
                    classicPlan: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger rounded" onClick={handleClose1}>
            Close
          </button>
          <button onClick={handleOfferUpdate} className="btn btn-success rounded">Update</button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default EditOffers;
