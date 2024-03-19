import { useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { IoMdCash } from "react-icons/io";
import httpClient from "../../components/HttpsClient"
import ClipLoader from "react-spinners/PulseLoader";

export default function CheckoutItemModal({cartData = {}, checkoutClosed, msgModalOpened}) {
    const [loading, setLoading] = useState(false)
    
    //contact info
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    //shipping info
    const [checkoutHB, setCheckoutHB] = useState("")
    const [checkoutBP, setCheckoutBP] = useState("")
    const [checkoutPC, setCheckoutPC] = useState("")
    const [checkoutCM, setCheckoutCM] = useState("")
    const [checkoutSP, setCheckoutSP] = useState("")

    //payment method
    const [isCrebit, setIsCrebit] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState("crebit")

    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvc, setCvc] = useState("")

    const crebitActive = () => {
        setPaymentMethod("crebit")
        if(!isCrebit) setIsCrebit(true) 
    }

    const crebitInactive = () => {
        setIsCrebit(false)
        setPaymentMethod("cash")
    }

    //total cost item
    let items = []
    const totalItemCost = cartData.reduce((total, item) => {
        const itemCost = item["item_quantity_cart"] * parseFloat(item["item_price"])
        items.push([item["item_id"],
                   item["item_quantity_cart"],
                   itemCost])

        return total + itemCost
    }, 0) 

    //open modal successful


    //submit checkout form
    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        let data = {}
        let orderTotalCost = totalItemCost + 5
        console.log(orderTotalCost)
        if (isCrebit) {
            data = {
                items, fullname, orderTotalCost, email, contactNumber,
                checkoutHB, checkoutBP, checkoutPC,
                checkoutCM, checkoutSP, paymentMethod,
                cardNumber, expiryDate, cvc
            }
        } else {
            data = {
                items, orderTotalCost, fullname, email, contactNumber,
                checkoutHB, checkoutBP, checkoutPC,
                checkoutCM, checkoutSP, paymentMethod
            }
        }

        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/checkoutcart"

        await httpClient.post(url, data).then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            alert(error.response.data.message)
        })
        .finally(() => {
            setLoading(false)
            checkoutClosed()
            msgModalOpened()
        })
    }

    return (
        <section className="checkout-modal-section">
            <div className="checkout-header">
                <h1><MdOutlineShoppingCartCheckout />CHECKOUT</h1>
            </div>
            {loading ? (
                <section className='loader--section'>
                    <p>Wait for the Process to End</p>
                    <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                </section>
            ):(
                <form className="checkout-modal-content" onSubmit={onSubmit}>
                    <div className="checkout-item-container">
                        <div><p>Item</p></div>
                        <div className="checkout-item-content">
                            <div className="checkout-item-label">
                                <label htmlFor="checkout-item-name">Name</label>
                                <label htmlFor="checkout-item-quantity">Quantity</label>
                                <label htmlFor="checkout-item-price">Price</label>
                            </div>
                            <div className="checkout-item-input-container">
                                {cartData.map(item => (
                                    <div className="checkout-item-input" key={item["cart_id"]}>
                                        <div>
                                            <p>{item["item_name"]}</p>
                                        </div>
                                        <div>
                                            <p>{item["item_quantity_cart"]}</p>
                                        </div>
                                        <div>
                                            <p>${(item["item_quantity_cart"] * parseInt(item["item_price"], 10))}.00</p>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="checkout-total-input">
                                    <div>
                                        <p>Delivery Cost</p>
                                    </div>
                                    <div>
                                        <p>$5.00</p>
                                    </div>
                                </div>
                                <div className="checkout-total-input">
                                    <div>
                                        <p>Total Cost</p>
                                    </div>
                                    <div>
                                        <p>${totalItemCost + 5}.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-item-container">
                        <div><p>Contact Information</p></div>
                        <div className="checkout-item-content">
                            <div className="checkout-contact-info ">
                                <label htmlFor="checkout-name">Fullname</label>
                                <input id="checkout-name" type="text"
                                value={fullname} 
                                onChange={(e) => setFullname(e.target.value)}
                                required/>
                            </div>
                            <div className="checkout-email-num">
                                <div className="checkout-contact-info ">
                                    <label htmlFor="checkout-email">Email Address</label>
                                    <input id="checkout-email" type="text"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required/>
                                </div>
                                <div className="checkout-contact-info ">
                                    <label htmlFor="checkout-num">Contact Number</label>
                                    <input id="checkout-num" type="text"
                                    value={contactNumber} 
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-item-container">
                        <div><p>Shipping Address</p></div>
                        <div className="checkout-item-content">
                            <div className="checkout-hbp">
                                <div className="checkout-hb">
                                    <label htmlFor="checkout-house">House / Building Number</label>
                                    <input id="checkout-house" type="text"
                                    value={checkoutHB} 
                                    onChange={(e) => setCheckoutHB(e.target.value)}
                                    required/>
                                </div>
                                <div className="checkout-hb">
                                    <label htmlFor="checkout-barangay">Barangay & Purok / street</label>
                                    <input id="checkout-barangay" type="text"
                                    value={checkoutBP} 
                                    onChange={(e) => setCheckoutBP(e.target.value)}
                                    required/>
                                </div>
                                <div className="checkout-postal">
                                    <label htmlFor="checkout-postal">Postal Code</label>
                                    <input id="checkout-postal" type="text"
                                    value={checkoutPC} 
                                    onChange={(e) => setCheckoutPC(e.target.value)}
                                    required/>
                                </div>
                            </div>
                            <div className="checkout-city-state">
                                <div className="checkout-cs">
                                    <label htmlFor="checkout-cm">City / Municipality</label>
                                    <input id="checkout-cm" type="text"
                                    value={checkoutCM} 
                                    onChange={(e) => setCheckoutCM(e.target.value)}
                                    required/>
                                </div>
                                <div className="checkout-cs">
                                    <label htmlFor="checkout-sp">State / Province</label>
                                    <input id="checkout-sp" type="text"
                                    value={checkoutSP} 
                                    onChange={(e) => setCheckoutSP(e.target.value)}
                                    required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-item-container">
                        <div><p>Payment</p></div>
                        <div className="checkout-item-content">
                            <div className="checkout-payment">
                                <div className="checkout-payment-crebit" onClick={crebitActive}>
                                    <BsCreditCard2BackFill />
                                    <p>Credit or Debit Card</p>
                                    { isCrebit ? (
                                        <div className="payment-circle active"></div>
                                    ):(
                                        <div className="payment-circle"></div>
                                    )}
                                    
                                </div>
                                <div className="checkout-payment-cash" onClick={crebitInactive}>
                                    <IoMdCash />
                                    <p>Cash On Delivery</p>
                                    { !isCrebit ? (
                                        <div className="payment-circle active"></div>
                                    ):(
                                        <div className="payment-circle"></div>
                                    )}
                                </div>
                            </div>
                            { isCrebit && <div className="crebit-payment">
                                <div className="num-expr">
                                    <label htmlFor="card-num">Card Number</label>
                                    <input type="text" id="card-num" 
                                    value={cardNumber} 
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required/>
                                </div>
                                <div className="num-expr">
                                    <label htmlFor="expiry-date">Expiry Date</label>
                                    <input type="text" id="expiry-date" 
                                    value={expiryDate} 
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required/>
                                </div>
                                <div>
                                    <label htmlFor="cvc-cvv">CVC / CVV</label>
                                    <input type="text" id="cvc-cvv" 
                                    value={cvc} 
                                    onChange={(e) => setCvc(e.target.value)}
                                    required/>
                                </div>
                            </div>
                            }   
                        </div>
                    </div>
                    <div className="checkout-modal-btn-container"><button type="submit" className="shop-btn checkout-modal-btn">Checkout</button></div>
                </form>
            )}
        </section>
    )
}