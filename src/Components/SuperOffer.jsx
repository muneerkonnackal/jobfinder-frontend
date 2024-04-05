import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import offerimg from "../Assets/offer2.jpg";
import { Col, Row } from "react-bootstrap";
import { addOffersAPI } from "../services/allAPI";
import EditOffers from "./EditOffers";

function SuperOffer() {
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//*store token for fetch id
const [token , setToken] =useState("")
  

useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
   },[])
   console.log('token:',token);


  const [offer, setOffer] = useState({
    offerImage: "",
    url: "",
    basicPlan: "",
    standardPlan: "",
    classicPlan: "",
  });

  const handleClose1 = ()=>{
setOffer({
    offerImage: "",
    url: "",
    basicPlan: "",
    standardPlan: "",
    classicPlan: "",
})
setPreview("")
  }



  useEffect(() => {
    if (offer.offerImage) {
      setPreview(URL.createObjectURL(offer.offerImage));
    }
  }, [offer.offerImage]);
  console.log(preview);

//fUnction to add offers
const handleOffer = async () => {
    const { offerImage, url ,basicPlan,standardPlan,classicPlan} = offer;
    console.log('Offer Details:', offer);
    if(!offerImage|| !url|| !basicPlan|| !standardPlan|| !classicPlan){
      toast.warn("Please fill the form Completely")
    }
  else{
    const reqBody = new FormData();
    reqBody.append('offerImage', offerImage);
    reqBody.append('url', url);
    reqBody.append('basicPlan', basicPlan);
    reqBody.append('standardPlan', standardPlan);
    reqBody.append('classicPlan', classicPlan);
  
    try {
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
      const result = await addOffersAPI(reqBody,reqHeader);
      console.log('API Result:', result);
        
      if (result.status === 201) {
        toast.success('Offer Updated Successfully');
        handleClose()
        handleClose1()
        setPreview("")
      } else {
        toast.error(result.data.message || 'Error Updating Offer');
      }
    } catch (error) {
      console.error('Error Updating Offer', error);
  
     
  }
  }
    
}

  console.log("offer:", offer);

  return (
    <>
      <button onClick={handleShow} className="btn rounded btn-primary ms-5 ">
        Update
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        //   centered
        scrollable
        style={{ border: "none" }}
        className="rounded-5 "
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3  mt-1 ">
            <Col md={4}>
              <label
                htmlFor="offer"
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
                    id="offer"
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        offerImage: e.target.files[0],
                      })
                    }
                  />
                  <img
                    style={{ border: "5px solid #e496ef" }}
                    width={"150px"}
                    height={"150px"}
                    src={preview ? preview : offerimg}
                    alt="no-image"
                    className=" rounded-circle shadow"
                  />
                </div>
              </label>
            </Col>
            <Col md={8}>
              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="URL of Youtube Video"
                autoFocus
                value={offer.url}
                onChange={(e) => setOffer({ ...offer, url: e.target.value })}
                    />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Basic Plan In Rupees Per Month"
                autoFocus
                value={offer.basicPlan}
                onChange={(e) =>
                  setOffer({
                    ...offer,
                    basicPlan: e.target.value
                  })
                }
              />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Standard Plan In Rupees Per Month"
                autoFocus
                value={offer.standardPlan}
                onChange={(e) =>
                  setOffer({
                    ...offer,
                    standardPlan: e.target.value,
                  })
                }
              />

              <input
                type="text"
                className="form-control mt-3 rounded border border-2"
                placeholder="Amount Of Classic Plan In Rupees Per Year"
                autoFocus
                value={offer.classicPlan}
                onChange={(e) =>
                  setOffer({
                    ...offer,
                    classicPlan: e.target.value,
                  })
                }
              />
            </Col>
          </Row>

          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger rounded" onClick={handleClose1}>
            Close
          </button>
          <button onClick={handleOffer} className="btn btn-success rounded">Send</button>
         <EditOffers/>

        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default SuperOffer;
