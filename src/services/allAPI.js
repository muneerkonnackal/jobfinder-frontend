

import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"



//:register api
export const registerAPI = async(candidate)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,candidate,"")
}

//:Login API
export const loginAPI = async(candidate)=>{
  return  await commonAPI("POST",`${BASE_URL}/user/login`,candidate,"")
}

//:add profile api 
export const addProfileAPI = async(reqBody,reqHeader)=>{
    return  await commonAPI("POST",`${BASE_URL}/profile/add`,reqBody,reqHeader)
  }

//:getProfile API
export const getProfileAPI = async(reqHeader)=>{
    return  await commonAPI("GET",`${BASE_URL}/profile/candidateProfile`,"",reqHeader)
  }

//:edit candidate profile api

export const editProfileAPI = async(reqBody,reqHeader)=>{
  return  await commonAPI("PUT",`${BASE_URL}/profile/edit`,reqBody,reqHeader)
}

//:admin register api
export const adminRegisterAPI = async(admin)=>{
  return await commonAPI("POST",`${BASE_URL}/admin/register`,admin,"")
}

//:Admin Login API
export const AdminLoginAPI = async(admin)=>{
  return  await commonAPI("POST",`${BASE_URL}/admin/login`,admin,"")
}

//: Edit Admin profile
export const editAdminProfileAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${BASE_URL}/admin/edit`,reqBody,reqHeader)
}

//:addJobsAPI
export const addJobsAPI = async(reqBody,reqHeader)=>{
  return  await commonAPI("POST",`${BASE_URL}/job/add`,reqBody,reqHeader)
}


//:get home jobs api

export const homeJobsAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/job/home-job`)
}

//: get all jobs
export const allJobsAPI = async(searchKey,reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/job/all-job?search=${searchKey}`,"",reqHeader)
}

//:admin jobs api

export const adminJobsAPI = async(reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/admin/admin-jobs`,"",reqHeader)
}

//:edit admin jobs API
export const editAdminJobsAPI = async(jobId,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${BASE_URL}/job/edit/${jobId}`,reqBody,reqHeader)
}

//:delete admin jobs API  
export const deleteJobsAPI = async(jobId,reqHeader)=>{
  return await commonAPI("DELETE",`${BASE_URL}/job/remove/${jobId}`,{},reqHeader)
}


//:get alll profiles to home api

export const homeProfilesAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/profile/home-profile`)
}

//:addApplicationAAPI
export const addApplicationAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${BASE_URL}/application/add`,reqBody,reqHeader)
}

//:getappliedjobsAPI

export const appliedJobsAPI = async(reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/application/candidate-applications`,"",reqHeader)
}


//:delete applied jobs API  
export const deleteApplicationAPI = async(delId,reqHeader)=>{
  return await commonAPI("DELETE",`${BASE_URL}/application/remove/${delId}`,{},reqHeader)
}


//:getappliedjob candidates API

// export const getApplicantsAPI = async(jobId, userId, reqHeader)=>{
//   return await commonAPI("GET",`${BASE_URL}/applicants`,"",reqHeader)
// }
export const getApplicantsAPI = async (userId,jobId, reqHeader) => {
  return await commonAPI("GET", `${BASE_URL}/application/applicants/${userId}/${jobId}`, "", reqHeader);
}

 //:otp verification
// export const otpMobileAPI = async(number)=>{
//   return await commonAPI("POST",`${BASE_URL}/admin/register`,number,"")
// }

//:getallprofiles to adminm

export const superAdminProfilesAPI = async(searchKey,reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/profile/super-profile?search=${searchKey}`,"",reqHeader)
}

//:delete profile by super admin
export const deleteProfileAPI = async(profileId,reqHeader)=>{
  //:path parameter - :id - router
  return await commonAPI("DELETE",`${BASE_URL}/profile/remove/${profileId}`,{},reqHeader)
}


//:getallprofiles to adminm

export const superRecruitersAPI = async(searchKey,reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/admin/super-admin?search=${searchKey}`,"",reqHeader)
}

//:delete profile by super admin
export const deleteRecruitersAPI = async(AdminId,reqHeader)=>{
  //:path parameter - :id - router
  return await commonAPI("DELETE",`${BASE_URL}/admin/remove/${AdminId}`,{},reqHeader)
}

//:get alll profiles to header api

export const headerProfilesAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/profile/header-profile`)
}


//:addReportAPI
export const addReportAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${BASE_URL}/report/add`,reqBody,reqHeader)
}


//:Get reports to superadmin API
export const getComplaintsAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/report/candidate-report`)
}


//:delete complaints  by admin

export const deleteComplaintsAPI = async(complaintId,reqHeader)=>{
  return await commonAPI("DELETE",`${BASE_URL}/report/report-remove/${complaintId}`,{},reqHeader)
}


//:Add Offers By Admin
export const addOffersAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${BASE_URL}/offer/add`,reqBody,reqHeader)
}

//:getoffers by candidte
export const getOffersAdminAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/offer/get-offer`)
}

//:edit Offers By Admin
export const editAdminOffersAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${BASE_URL}/offer/edit`,reqBody,reqHeader)
}

//:get offers to admin
export const getOffersAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/offer/get-offer`)
}

//:addpayments
export const addTransactionsAPI = async(reqBody)=>{
  return await commonAPI("POST",`${BASE_URL}/payment/checkout`,reqBody)
}


//:Get Transaction details to superadmin API
export const getTransactionsAPI = async()=>{
  return await commonAPI("GET",`${BASE_URL}/payment/payment-report`)
}