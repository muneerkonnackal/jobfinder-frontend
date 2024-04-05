import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import companylogo from '../Assets/userplus2.jpg'
import { BASE_URL } from '../services/baseurl';
import { Link } from 'react-router-dom';
const moment = require('moment');

function Jobcard({job}) {
  console.log(job);
  
  return (
    <>

    
    <Card className='rounded shadow ' style={{ width: '19rem'}}>
      <div className='d-flex justify-content-between '>
        <Card.Img  width={'50px'} className='w-25 mt-3 ms-3 rounded-2 shadow border' height={'70px'} variant="top" src={job?`${BASE_URL}/uploads/${job.companylogo}`:companylogo} alt='No-Image'/>
        <h6 className='mt-3 me-3 text-secondary'>{moment(job.createdAt).fromNow()}</h6>
      </div>  
          <Card.Body>
        <Card.Title style={{color:"blue"}} className=' fs-3'>{job.position}</Card.Title>
         <Card.Text>
        <h6 style={{marginTop:"-8px",color:"green"}}>{job.company}</h6>
        <h6>Location : <span className=''>{job.location}</span></h6>
        <h6>Qualification: {job.qualification}</h6>
        <h6>{job.typeofworker}</h6>
        <h6>{job.worktype}</h6>
        <h6>Expected Salary : ₹{job.expsalary}</h6>
        <h6>Last date : {job.lastdate}</h6>
        </Card.Text>
       <Link to={'/userlogin'}> <Button className='w-100 rounded' variant="success">Apply</Button></Link>
      </Card.Body>
    </Card>
  

    </>
  )
}

export default Jobcard