import {motion, AnimatePresence, useInView, useScroll} from "framer-motion"
import { Link } from "react-router-dom"

export default function PageTwo() {
    const slideLeftAnim = {
        initial: {
            x: 0,
        }, 
        animate: {
            x: "-100%",
            transition: {
                delay: 0.2,
                duration:0.3
            }
        },
        viewport: {
            once:true,
            amount: 0.5
        }
    }

    const slideRigthAnim = {
        initial: {
            x: 0,
        }, 
        animate: {
            x: "100%",
            transition: {
                delay: 0.3,
                duration:0.3
            }
        },
        viewport: {
            once:true,
            amount: 0.2
        }
    }

    return (
        <section className="page-two-section">
            <div className="page-two-container-left">
                <div className="page-two-left-text-up">
                    <motion.div className="reveal-container"
                    variants={slideLeftAnim}
                    initial="initial"
                    whileInView="animate"
                    viewport="viewport"></motion.div>
                    <div>
                        <h1>IC<span>mile</span></h1>
                        <p>for your work</p>
                    </div>
                </div>
                <div className="page-two-left-img">
                    <div>
                        <img src="images/icare.svg"/>
                    </div>
                    <div>
                        <Link to="/"><button className="about-us-btn-page-two">About Us</button></Link>
                    </div>
                </div>
                <div className="page-two-left-text-btm">
                    <motion.div className="reveal-container"
                    variants={slideLeftAnim}
                    initial="initial"
                    whileInView="animate"
                    viewport="viewport"></motion.div>
                    <div><h1>IC<span>MED</span></h1></div>
                </div>
            </div>

            <div className="page-two-container-right">
                <div className="page-two-right-up-img">
                    <div></div>
                    <div><img src="images/icmile.svg"/></div>
                </div>
                <div className="page-two-right-text">
                    <motion.div className="reveal-container"
                    variants={slideRigthAnim}
                    initial="initial"
                    whileInView="animate"
                    viewport="viewport"></motion.div>
                    <div>
                        <h1>IC<span>are</span></h1>
                        <p>for your health</p>
                    </div>
                </div>
                <div className="page-two-right-btm-img">
                    <div><img src="images/dogmed.svg"/></div>
                    <div>Contact Us</div>
                </div>
            </div>
        </section>
    )
}