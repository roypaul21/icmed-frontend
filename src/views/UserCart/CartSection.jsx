import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import httpClient from "../../components/HttpsClient"
import ReactPaginate from 'react-paginate';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom/dist";
import ClipLoader from "react-spinners/PulseLoader";
import { FaTrashAlt } from "react-icons/fa";
import RemoveItemCart from "./RemoveItemCart";
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import CheckoutItemModal from "./CheckoutItemModal";
import {motion, AnimatePresence} from "framer-motion"
import { IoBagCheck } from "react-icons/io5";

export default function CartSection() {
    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [msgModal, setmsgModal] = useState(false) 
    

    const [currentPage, setCurrentpPage] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    
    const [isCheckout, setIsCheckout] = useState(false)

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
    },[searchInput])

    const fetchItems = async() => {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url = backend_url + "/api/getitemcart"
        setLoading(true)
        try {
            if (searchInput) {
                url = url + `/${searchInput}`
            }

            let response = await httpClient.get(url)
            setItems(response.data["cart_items"])
            
            
        }catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        localStorage.setItem("currentCartPage", event.selected)
        if (searchInput) {
            setItemOffset(0);
        }
    };

    useEffect(() => {
        const currentCartPage = localStorage.getItem("currentCartPage")
        console.log(currentCartPage)

        if(currentCartPage) {
            const newOffset = (currentCartPage * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        }
    }, [])


    const removeItemCart = async(item_id) => {
        await RemoveItemCart(item_id)
        fetchItems()
    }

    //checkout modal
    const checkoutClosed = () => {
        setIsCheckout(false)
    }

    const checkooutOpened = () => {
        if (!isCheckout) setIsCheckout(true)
    }

    const msgModalOpened = () => {
        if (!msgModal) setmsgModal(true)
    }

    const msgModalClosed = () => {
        setmsgModal(false)
        fetchItems()
    }

    return (
        <section className="cart-section">
            <AnimatePresence mode="wait" initial={false}>
                { isCheckout && <div className="background-modal">
                        <motion.div className="checkout-item-modal"
                        initial={{y: '-100vh'}}
                        animate={{y:0}}
                        exit={{y:'-100vh'}}>
                            <div className="close-modal-btn"><IoClose id="checkout-closed" onClick={checkoutClosed}/></div>
                            <CheckoutItemModal cartData={items} checkoutClosed={checkoutClosed} msgModalOpened={msgModalOpened} />
                        </motion.div>
                </div>}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
                { msgModal && <div className="background-modal"> 
                    <motion.div className="checkout-msg-modal"
                    initial={{y: '-100vh'}}
                    animate={{y:0}}
                    exit={{y:'-100vh'}}>
                        <h1><IoBagCheck />Cart Item Checkout Successfully</h1>
                        <Link to="/order"><button className="shop-btn view-order-btn" onClick={msgModalClosed}>View Order</button></Link>
                    </motion.div>
                </div>}
            </AnimatePresence>
            
            <div className="store-container">
                <div className="store-header overflow-container">
                    <motion.h1
                    initial={{y:'-100%'}}
                    animate={{y:0}}
                    transition={{type:'tween', duration:0.3, delay:0.3}}>
                        <FaCartShopping />Cart
                    </motion.h1>
                </div>
                <div className="search-checkout-container"> 
                    <form className="store-search-bar">
                        <BiSearchAlt/>
                        <input type="text" id="search-input"
                        value={searchInput} 
                        onChange={handleSearchInputChange}
                        onKeyDown={preventFormSubmit}
                        placeholder="Search item....."
                        />
                    </form>

                    {items.length !== 0 ? (
                        <button className="shop-btn checkout-btn" onClick={checkooutOpened}>Checkout</button>
                    ) : (
                        <button className="shop-btn checkout-btn-inactive">Checkout</button>
                    )}

                </div>
                <div className="store-container-content">
                    {loading ? (
                        <section className='loader--section'>
                            <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                        </section>
                    ) : (
                        <>
                            <div className="store-content">
                                {currentItems.map(item => (
                                        <div className="item-box" key={item["item_id"]}>
                                            <div className="item-name">
                                                <p>{item["item_name"]}</p>
                                                <div className="remove-item-cart-icon">
                                                    <FaTrashAlt style={{cursor:"pointer"}} onClick={() => removeItemCart(item["item_id"])}/>
                                                </div>
                                            </div>
                                            <div className="item-img">
                                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_one"]}`} loading="lazy" alt="Image"/>
                                            </div>
                                            <div className="item-footer">
                                                <div>
                                                    <p>${item["item_price"]}.00</p>
                                                </div>
                                                <div>
                                                    <Link to={`/item/${item["item_id"]}`}><button className="view-item-btn">View</button></Link>
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