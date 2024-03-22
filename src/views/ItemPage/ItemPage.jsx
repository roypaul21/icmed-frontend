import { useEffect, useState } from "react"
import {Link, useParams} from "react-router-dom"
import httpClient from "../../components/HttpsClient"
import { MdTransitEnterexit } from "react-icons/md";
import ClipLoader from "react-spinners/PulseLoader";
import { IoAdd } from "react-icons/io5";
import { TiMinus } from "react-icons/ti";
import { FaSquareCheck } from "react-icons/fa6";
import RemoveItemCart from "../UserCart/RemoveItemCart";
import { ToastContainer, toast } from 'react-toastify';
import {motion, AnimatePresence} from "framer-motion"

export default function ItemPage(){
    const param = useParams()
    const [item, setItem] = useState([])
    const [imgZoom, setImgZoom] = useState("")
    const [imgModal, setImgModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const [isItemCart, setIsItemCart] = useState(null)
    const [addcartModal, setAddCartMOdal] = useState(false)

    useEffect(() => {
        checkCartItem()
        fetchItem()
        setItemQuantityCart(item["item_quantity_cart"]);
    },[param, isItemCart, item["item_quantity_cart"]])

    const fetchItem = async() => {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url
        if (isItemCart) {
            url = backend_url + `/api/getsingleitemcart/${param.item_id}`;
        } else {
            url = backend_url + `/api/getsingleitem/${param.item_id}`;
        }

        try{
            let response = await httpClient.get(url)
            setItem(response.data.item)
        }catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const checkCartItem = async() => {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url = backend_url + `/api/checkitemcart/${param.item_id}`

        try{
            let response = await httpClient.get(url)
            setIsItemCart(response.data.cart_item)
        }catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    const imgModalClosed = () => {
        setImgModal(false)
    }

    const imgModalOpened = () => {
        if (!imgModal) setImgModal(true)
    }

    const toggleModal = (imageUrl) => {
        setImgZoom(imageUrl)
        imgModalOpened()
    };

    const addItemCart =  async(e) => {
        e.preventDefault()

        let itemID = item["item_id"]
        const data = {
            itemID,
            itemQuantity
        }

        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/additemcart"

        await httpClient.post(url, data).then(response => {
            addItemCartOpen()
        })
        .catch(error => {
            alert(error.response.data.message)
        }) 
    }

    const addItemCartOpen = () => {
        if(!addcartModal) setAddCartMOdal(true)
        checkCartItem()
    }

    const addItemCartClose = () => {
        setAddCartMOdal(false)
    }

    const removeItemCart = async(item_id) => {
        setLoading(true)
        try {
            await RemoveItemCart(item_id)
            setIsItemCart(null)
        } catch (error) {
            console.error("Error removing item:", error)
        } finally {
            setLoading(false)
        }
    }

    //item quantity 
    const itemQuantityInt = parseInt(item["item_quantity"], 10)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [itemQuantityCart, setItemQuantityCart] = useState(item["item_quantity_cart"])
    
    const addItemQuantity = () => {
        if (itemQuantity < itemQuantityInt) {
            
            if (isItemCart && itemQuantityCart < itemQuantityInt) {
                setItemQuantityCart(itemQuantityCart + 1)
            } else {
                setItemQuantity(itemQuantity + 1)
            }       
        }
    }

    const subItemQuantity = () => {
        if (itemQuantity > 1 || itemQuantityCart > 1) {
            if (isItemCart) {
                console.log("-1")
                setItemQuantityCart(itemQuantityCart - 1)
            } else {
                setItemQuantity(itemQuantity - 1)
            }
        }
    }

    //update item cart
    const updateItemCart = async(e) =>  {
        e.preventDefault()

        let itemID = item["item_id"]
        const data = {
            itemID,
            itemQuantityCart
        }

        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/updateitemcart"

        await httpClient.put(url, data).then(response => {
            toast.success(response.data.message);
        })
        .catch(error => {
            alert(error.response.data.message)
        }) 
    }

    return (
        <>
        {loading ? (
            <section className='loader--section'>
              <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
            </section>
          ) : ( 
        <section className="view-item-section">
            <ToastContainer />
            <AnimatePresence mode="wait" initial={false}>
            {imgModal && <div className="background-modal">
                <motion.div className="view-item-modal-content"
                initial={{y: '-100vh'}}
                animate={{y:0}}
                exit={{y:'-100vh'}}>
                    <div className="view-item-modal-img-zoom">
                        <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${imgZoom}`}/>
                    </div>
                    <div className="view-item-modal-close">
                       <button onClick={imgModalClosed}>Close</button>
                    </div>
                </motion.div>
            </div>}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
                {addcartModal && <div className="background-modal">
                    <motion.div className="add-cart-modal"
                    initial={{y: '-100vh'}}
                    animate={{y:0}}
                    exit={{y:'-100vh'}}>
                        <h1><FaSquareCheck />Item Added To Cart!</h1>
                        <p>{item["item_name"]}</p>
                        <div className="add-cart-btn">
                            <Link to="/cart"><button className="shop-btn view-cart-btn">View Cart</button></Link>
                            <button className="shop-btn" onClick={addItemCartClose}>Close</button>
                        </div>
                    </motion.div>
                </div>}
            </AnimatePresence>
            <div>
                <div className="view-item-left-container">
                    <div className="view-item-main-img" onClick={() => toggleModal(item["item_image_one"])}>
                        <img loading="lazy" 
                            src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_one"]}`} />
                    </div>
                    <div className="view-item-imgs" onClick={() => toggleModal(item["item_image_two"])}>
                        <div className="view-item-img">
                            <img loading="lazy" 
                                src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_two"]}`} />
                        </div>
                        <div className="view-item-img" onClick={() => toggleModal(item["item_image_three"])}>
                            <img loading="lazy" 
                                src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_three"]}`} />
                        </div>
                        <div className="view-item-img" onClick={() => toggleModal(item["item_image_four"])}>
                            <img loading="lazy" 
                                src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${item["item_image_four"]}`} />
                        </div>
                    </div>
                </div>
                <div className="view-item-right-container">
                    <div className="item-info-content">
                        <div>
                            <div className="item-info-type">
                                <p>Name</p>
                            </div>
                            <div className="item-info-value">
                                <p>{item["item_name"]}</p>
                            </div>
                        </div>
                        <div>
                            <div className="item-info-type">
                                <p>Price</p>
                            </div>
                            <div className="item-info-value">
                                <p>${item["item_price"]}.00</p>
                            </div>
                        </div>
                        <div>
                            <div className="item-info-type">
                                <p>Width</p>
                            </div>
                            <div className="item-info-value">
                                <p>{item["item_width"]} cm</p>
                            </div>
                        </div>
                        <div>
                            <div className="item-info-type">
                                <p>Height</p>
                            </div>
                            <div className="item-info-value">
                                <p>{item["item_height"]} cm</p>
                            </div>
                        </div>
                        <div>
                            <div className="item-info-type">
                                <p>Quantity</p>
                            </div>
                            <div className="item-info-value">
                                <p>{item["item_quantity"]}</p>
                            </div>
                        </div>
                        <div>
                            <div className="item-info-type">
                                <p>Description</p>
                            </div>
                            <div className="item-info-value">
                                <p>{item["item_desc"]}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="item-quantity-header">
                        <p>Item Quanity</p>
                        {isItemCart ? (   
                            <div className="item-quantity">
                                <button onClick={subItemQuantity}><TiMinus /></button>
                                <div><p>{itemQuantityCart}</p></div>
                                <button onClick={addItemQuantity}><IoAdd /></button>
                            </div>
                        ):(

                        
                            <div className="item-quantity">
                                <button onClick={subItemQuantity}><TiMinus /></button>
                                <div><p>{itemQuantity}</p></div>
                                <button onClick={addItemQuantity}><IoAdd /></button>
                            </div>
                        )}
                    </div>
                    <div className="item-info-btn">
                        {isItemCart ? (
                            <>  
                                <button className="shop-btn active-cart-btn" onClick={() => removeItemCart(item["item_id"])} >Remove Item</button>
                                <button className="shop-btn cart-btn" onClick={updateItemCart}>Update Item</button>
                            </>   
                        ) : (
                            <button className="shop-btn cart-btn" onClick={addItemCart}>Add To Cart</button>
                        )}
                    </div>
                </div>  
            </div>
        </section>
        )}
        </>
    )
}