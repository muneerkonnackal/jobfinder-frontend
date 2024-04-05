import React, { createContext, useState } from 'react';

export const addProfileResponseContext = createContext();
export const isAuthTokenContext = createContext();
export const addJobResponseContext = createContext();
export const editJobResponseContext = createContext();
export const appliedJobResponseContext = createContext()
export const profileEditResponseContext = createContext()


function ContextShare({ children }) {
  const [addProfileResponse, setAddProfileResponse] = useState({});
  const [isAuthToken, setIsAuthToken] = useState(true);
  const [editJobResponse, setEditJobResponse] = useState({});
  const [applyJobResponse,setApplyJobResponse] = useState({});
  const [addJobResponse, setAddJobResponse] = useState({})
  const [editProfileResponse, setEdipProfileResponse] = useState({})

  return (
    <addProfileResponseContext.Provider value={{ addProfileResponse, setAddProfileResponse }}>
      <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
        <editJobResponseContext.Provider value={{ editJobResponse, setEditJobResponse }}>
          <appliedJobResponseContext.Provider value={{applyJobResponse,setApplyJobResponse}}>
            <addJobResponseContext.Provider value={{addJobResponse, setAddJobResponse}} >
              <profileEditResponseContext.Provider value={{editProfileResponse, setEdipProfileResponse}}>{children}</profileEditResponseContext.Provider>
              </addJobResponseContext.Provider>
          </appliedJobResponseContext.Provider>
        </editJobResponseContext.Provider>
      </isAuthTokenContext.Provider>
      </addProfileResponseContext.Provider>
  );
}

export default ContextShare;
