import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import httpClient from "../../components/HttpsClient"
import ClipLoader from "react-spinners/PulseLoader";

export default function OrderDetails({orderDetails}) {
    const [loading, setLoading] = useState(true)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        fetchItems()
    },[])

    const fetchItems = async() => {

        const user_order_id = orderDetails["user_order_id"]

        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url = backend_url + `/api/getorderitems/${user_order_id}`

        await httpClient.get(url).then(response => {
            setOrderItems(response.data["items"])
        })
        .catch(error => {
            alert(error.response.data.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    
    return(
        <div className="order-details-section"> 
            {loading ? (
                <section className='loader--section'>
                    <p>Fetching Data</p>
                    <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                </section>
            ):(
                <>
                <div className="order-details-header">
                    <h1><FaFileAlt/>Order Details</h1>
                    <p>Transaction ID: {orderDetails["user_order_id"]}</p>
                </div>
                <div className="order-details-modal-content">
                    <div className="order-details-container">
                        <div><p>Item's Order</p></div>
                        <div className="order-details-content">
                            <div className="checkout-item-label">
                                    <label htmlFor="checkout-item-name">Name</label>
                                    <label htmlFor="checkout-item-quantity">Quantity</label>
                                    <label htmlFor="checkout-item-price">Price</label>
                            </div>
                            <div className="checkout-item-input-container">
                                {orderItems.map(items => (
                                    <div className="checkout-item-input">
                                        <div>
                                            <p>{items["item_name"]}</p>
                                        </div>
                                        <div>
                                            <p>{items["item_order_quantity"]}</p>
                                        </div>
                                        <div>
                                            <p>${items["item_order_price"]}.00</p>
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
                                        <p>${orderDetails["order_total_cost"]}.00</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="order-details-container">
                        <div><p>Contact Information</p></div>
                        <div className="order-details-content">
                            <div className="order-details-input">
                                <div>
                                    <label>Fullname</label>
                                    <div>{orderDetails["fullname"]}</div>
                                </div>
                            </div>
                            <div className="order-details-input">
                                <div>
                                    <label>Email Address</label>
                                    <div>{orderDetails["order_email"]}</div>
                                </div>
                                <div>
                                    <label>Contact Number</label>
                                    <div>{orderDetails["contact_number"]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-details-container">
                        <div><p>Shipping Address</p></div>
                        <div className="order-details-content">
                            <div className="order-details-input">
                                <div>
                                    <label>House / Building Number</label>
                                    <div>{orderDetails["house_building"]}</div>
                                </div>
                                <div>
                                    <label>Barangay and  Purok / Street</label>
                                    <div>{orderDetails["barangay_purok"]}</div>
                                </div>
                                <div>
                                    <label>Postal code</label>
                                    <div>{orderDetails["postal_code"]}</div>
                                </div>
                            </div>
                            <div className="order-details-input">
                                <div>
                                    <label>City / Municipality</label>
                                    <div>{orderDetails["city_municipality"]}</div>
                                </div>
                                <div>
                                    <label>State / Province</label>
                                    <div>{orderDetails["state_province"]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </>
            )}
            
        </div>
    )
}