import { lazy } from "react";
import { Link } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"

export default function HeroSection() {
    return (
        <section className="hero-section" >
          
            <motion.div className="hero-section-container overflow-container"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{x: '-100vw'}}>   
                <div className="hero-section-header overflow-container">
                    <motion.div className="hero-header-box overflow-container"
                    initial={{x:'-100%'}}
                    animate={{x:0}}
                    transition={{type: 'tween', delay: 0.1}}>
                        <motion.h1 
                        initial={{y: '100%'}}
                        animate={{y:0}}
                        transition={{type: 'tween', delay: 0.5, duration:0.3}}>
                            SHOP WITH
                        </motion.h1>
                    </motion.div>
                    <motion.div className="hero-header-box overflow-container"
                    initial={{x:'-100%'}}
                    animate={{x:0}}
                    transition={{type: 'tween', delay: 0.1}}>
                        <motion.h1
                        initial={{y: '100%'}}
                        animate={{y:0}}
                        transition={{type: 'tween', delay: 0.8, duration:0.3}}>
                            CONFIDENCE
                        </motion.h1>
                    </motion.div>
                </div>
                <motion.div className="hero-section-text overflow-container"
                initial={{x:'-100vw'}}
                animate={{x:0}}
                transition={{type: 'tween', delay: 0.1}}>
                    <motion.p
                    initial={{y: '100%'}}
                    animate={{y:0}}
                    transition={{type: 'tween', delay: 1.2, duration:0.3}}>
                        Enjoy a simple shop with <span>ic-mart</span>
                    </motion.p>
                </motion.div>
                <div className="hero-section-btn overflow-container">
                    <Link to="/">
                        <motion.button className="shop-btn btn-one"
                        initial={{y:'100%'}}
                        animate={{y:0}}
                        transition={{type:"spring", delay: 1.5, stiffness:"120"}}>
                            Shop Now
                        </motion.button>
                    </Link>
                    <Link to="/">
                        <motion.button className="shop-btn btn-two"
                        initial={{y:'100%'}}
                        animate={{y:0}}
                        transition={{type:"spring", delay: 1.5, stiffness:"120"}}
                        whileHover={{scale: 1.5}}>
                            About Us
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
         
        </section>
    )
}