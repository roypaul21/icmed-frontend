import { useEffect, useState } from "react"
import { Link } from "react-router-dom/dist"
import httpClient from "../../components/HttpsClient"
import {motion, AnimatePresence} from "framer-motion"

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(null);

    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            username,
            email,
            pwd,
            confirmPwd
        }

        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/create_user"
        try {
            const response = await httpClient.post(url, data);
            if (response.status === 200) {
                openModal();
            }
        
        } catch (error) {
            if (error.response.status === 400) {
                setIsError(error.response.data.message);
            } else {
                console.error('Error:', error);
            }
        }
    }

    const openModal = () => {
        if(!isModalOpen) setIsModalOpen(true)
    }

    return (
        <section className="signup-section">
            {isModalOpen && <section className="background-modal">
                <div className="signup-modal-content">
                    <h1>User Created Successfully!</h1>
                    <div>
                        <button className="shop-btn btn-three">Login</button>
                        <Link to="/landing"><button className="shop-btn btn-four">Return</button></Link>
                    </div>
                </div>
            </section>
            }
            <motion.div className="signup-container"
            initial={{x: '100vw'}}
            animate={{x:0}}
            transition={{delay: 0.2, type: 'spring', stiffness:100, duration: 0.5}}>
                <div className="signup-header overflow-container">
                    <motion.h1
                    initial={{y:'-100%'}}
                    animate={{y:0}}
                    transition={{type:"tween", delay:0.8}}>
                        Sign Up
                    </motion.h1>
                </div>
                <form className="signup-content" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" 
                            type="text"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="bob2024"
                        required/>
                    </div>
                    <div>
                        <label htmlFor="user-email">Email Address</label>
                        <input id="user-email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="text"
                            placeholder="example@gmail.com"
                        required/>
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input id="pwd" 
                            value={pwd} 
                            onChange={(e) => setPwd(e.target.value)}
                            type="password"
                        required/>
                    </div>
                    <div>
                        <label htmlFor="confirm-pwd">Confirm Password</label>
                        <input id="confirm-pwd" 
                            value={confirmPwd} 
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            type="password"
                        required/>
                    </div>
                    <div>
                        <button type="submit">Sign Up</button>
                    </div>
                    <br></br>
                    <p className="error-output">{isError}</p>
                </form>
            </motion.div>
        </section>
    )
}