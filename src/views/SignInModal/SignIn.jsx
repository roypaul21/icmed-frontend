import React, {useState} from 'react';
import { Link } from 'react-router-dom/dist';
import { IoIosClose } from "react-icons/io";
import httpClient from "../../components/HttpsClient"
import {motion, AnimatePresence} from "framer-motion"

export default function SignIn({loginModalClose, showModal}) {
    const [username_email, setUsernameEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [message, setMessage] = useState(null);
    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            username_email,
            pwd,
        }
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/login"

        await httpClient.post(url, data).then(response => {
            window.location.href = "/store" 
            setMessage(response.data.message)
        })
        .catch(error => {
            setMessage(error.response.data.message)
        });

    }
    return (
        <>
            {showModal && 
                <motion.div className="signin-modal-content"
                initial={{y: '-100vh'}}
                animate={{y:0}}
                exit={{y:'-100vh'}}>
                    <div><IoIosClose  onClick={() => loginModalClose()} style={{cursor:"pointer"}}/></div>
                    <div className="signin-modal-header">
                        <h1>Sign In</h1>
                    </div>
                    <form className="signin-input" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="username">Username or Email</label>
                            <input type="text"  
                            value={username_email} 
                            onChange={(e) => setUsernameEmail(e.target.value)}
                            id="username"
                            required/>
                        </div>
                        <div>
                            <label htmlFor="pwd">Password</label>
                            <input type="password"  
                            value={pwd} 
                            onChange={(e) => setPwd(e.target.value)}
                            id="pwd"
                            required/>
                        </div>
                        <div>
                            <button className='login-btn' type='submit'>Login</button>
                        </div>
                    </form>
                    <div className='signin-modal-footer'><p>No Account Yet? <Link to="/signup"><span id="register-txt" onClick={() => loginModalClose()} >Register</span></Link></p></div>
                    <p className="error-output">{message}</p>
                </motion.div>
            }
        </>
    )
}