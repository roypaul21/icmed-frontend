import { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import httpClient from "../../components/HttpsClient"
import ReactPaginate from 'react-paginate';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/PulseLoader";
import {motion, AnimatePresence} from "framer-motion"
import { SessionContext } from "../../components/SessionContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import RemoveItemStore from "./removeItemStore";
import SignIn from "../SignInModal/SignIn";

export default function StoreSection(){
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {sessionToken, authorization} = useContext(SessionContext)

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
        setSearchInput(sanitizedInputValue);
    };

    const preventFormSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        fetchItems(searchInput)
        localStorage.removeItem("currentCartPage")
    },[searchInput])

    const fetchItems = async() => {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url = backend_url + "/api/getitems"
        setLoading(true)
        try {
            if (searchInput) {
                url = url + `/${searchInput}`
                setItemOffset(0);
            }

            let response = await httpClient.get(url)
            setItems(response.data["items"])

        }catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    }; 

    const removeItemStore = async(item_id) => {
        await RemoveItemStore(item_id)
        fetchItems()
    }

    //Defaul Login
    const LoginOpenedModal = () => {
        if (!isLoginOpen) setIsLoginOpen(true);
    }
    const LoginClosedModal = () => {
        setIsLoginOpen(false);
    } 

    return (
        <section className="store-section">
            <AnimatePresence>
                {isLoginOpen && <section className="background-modal"> 
                    <SignIn loginModalClose={LoginClosedModal} showModal={isLoginOpen}/>
                </section>
                }
            </AnimatePresence>
            <div className="store-container">
                <div className="store-header overflow-container">
                    <motion.h1
                    initial={{y:'-100%'}}
                    animate={{y:0}}
                    transition={{type:'tween', duration:0.3, delay:0.3}}>
                        Store
                    </motion.h1>
                </div>
                <form className="store-search-bar">
                    <BiSearchAlt/>
                    <input type="text" id="search-input"
                     value={searchInput} 
                     onChange={handleSearchInputChange}
                     onKeyDown={preventFormSubmit}
                     placeholder="Search item....."
                    />
                    <button className="search-btn" type="submit">Search</button>
                </form>
                <div className="store-container-content">
                    {loading ? (
                        <section className='loader--section'>
                            <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                        </section>
                    ) : (
                        <>
                            <div className="store-content">
                                {currentItems.map(item => (
                                    <div className="item-content-container" key={item["item_id"]}>
                                        {authorization ? (
                                            <div className="delete-update-icons">
                                                <RiDeleteBinLine id="delete-item-icon" onClick={() => removeItemStore(item["item_id"])}/>
                                                <FiEdit id="update-item-icon"/>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <div className="item-box" >
                                            <div className="item-name">
                                                <p>{item["item_name"]}</p>
                                            </div>
                                            <div className="item-img">
                                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_one"]}`} loading="lazy" alt="Image"/>
                                            </div>
                                            <div className="item-footer">
                                                <div>
                                                    <p>${item["item_price"]}.00</p>
                                                </div>
                                                <div>
                                                    {sessionToken ? (
                                                        <Link to={`/item/${item["item_id"]}`}><button className="view-item-btn">View</button></Link>
                                                    ):(
                                                        <button className="view-item-btn" onClick={LoginOpenedModal}>Login</button>
                                                    ) }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<GrNext color="black" fill="black" stroke="black"/>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel={<GrPrevious />}
                                renderOnZeroPageCount={null}
                                containerClassName="pagination"
                                pageLinkClassName="page-num"
                                previousLinkClassName="page-num"
                                nextLinkClassName="page-num"
                                activeLinkClassName="active"
                            />
                        </>
                    )}
                </div>
                
            </div>
        </section>
    )
}