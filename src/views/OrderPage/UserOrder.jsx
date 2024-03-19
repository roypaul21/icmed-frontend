import { useState, useEffect } from "react"
import ClipLoader from "react-spinners/PulseLoader";

export default function UserOrder() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrder()
    },[])

    const fetchOrder = async() => {

    }

    return (
        <section className="user-order-section">
            <div><h1>My Orders</h1></div>
            <div className="user-order-container">
                {loading ? (
                    <section className='loader--section'>
                        <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                    </section>
                ):(
                    <div className="user-order-content">

                    </div>
                )}
            </div>
        </section>
    )
}