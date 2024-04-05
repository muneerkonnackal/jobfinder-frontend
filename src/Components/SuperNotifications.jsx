import React from 'react'
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import offerimg from "../Assets/offer2.jpg";
import { Col, Row } from "react-bootstrap";

function SuperNotifications() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  //*store token for fetch id
  const [token , setToken] =useState("")
  
  useEffect(()=>{
      setToken(sessionStorage.getItem("token"))
     },[])
     console.log('token:',token);
  


  return (
    <>
    
    <button onClick={handleShow} className="btn rounded btn-primary ms-5 ">
        Update
      </button>


      
    
    </>
  )
}

export default SuperNotifications