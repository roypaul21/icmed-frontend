import React, { createContext, useState, useEffect } from 'react';
import httpClient from './HttpsClient';
import ClipLoader from "react-spinners/ClimbingBoxLoader";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [authorization, setAuthorization] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCredentials = async () => {
            const backend_url = import.meta.env.VITE_BACKEND_API_URL
            const url = backend_url + "/api/get_session"

            await httpClient.get(url).then(response => {
              setSessionToken(response.data.session)
              setAuthorization(response.data.auth_session)
            })
            .catch(error => {
                setMessage(error.response.data.message)
            })
            .finally(() => {
              setLoading(false)
            })


    
        }
        fetchCredentials()

    }, [])

  return (
    <>
        {loading ? (
          <section className='loader--section'>
            <ClipLoader size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
          </section>
        ) : (
          <SessionContext.Provider value={{ sessionToken, authorization }}>
            {children}
          </SessionContext.Provider>
        )}
    </>
  );
};

export { SessionContext, SessionProvider };